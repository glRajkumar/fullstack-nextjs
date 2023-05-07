# Full stack project in Next.js + Prisma + Postgresql
Full stack project with - Typescript, Next.js, Next-Auth, Tailwind, Prisma, Postgesql, React Query, React Hook Form

<br />

#### Tutorials for beginners reference (youtube links)
1) Full Stack beginner project (Next-13 + Prisma + Postgresql) by [@developedbyed](https://youtu.be/4xduSsxa5Os)
2) Next-Auth Intro by [Daily Tution](https://youtu.be/t0Fs0NO78X8)
3) Intro to Prisma by [Web Dev Simplified](https://youtu.be/RebA5J-rlwg)
4) SQL Intro [techTFQ Playlists](https://www.youtube.com/@techTFQ) (highly recommended)

<br />

## Project setup
After cloning project, you can setup project with `npm i`. Then add the following data sets in .env file.

```bash
# Database connection
DATABASE_URL=""
SHADOW_DATABASE_URL="" # same as DATABASE_URL

# Next auth configurations
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
NEXTAUTH_SECRET=""
```

- To run project use `npm run dev`


<br />

## New project setup with same environments.
- Create project using `npx create-next-app` with app directory.

## Prisma setup
### Installation
- install Prisma and needed dev dependencies with `npm i -D prisma @prisma/client`

> Note: For a Typescript project, you'll need to install `typescript` and `ts-node` as well as well as any other dev dependencies you need for your project (such as `@types/node` for a Node project)

### Initialize Prisma

- this will create a `prisma` folder with a `schema.prisma` file

```bash
npx prisma init --datasource-provider postgresql
```

> --datasource-provider is optional and will default to `postgresql`

- Add your database connection URI string to `.env`

```bash
DATABASE_URL=""
SHADOW_DATABASE_URL="" # same as DATABASE_URL
```

##### IF you already have data in your database
- run `npx db pull` if you already have data in your database and you want to generate the Prisma schema

- add your schema in `schema.prisma`


### Define your Database Schema
- Define your database models

```prisma
model User {
  id    String  @id  @default(uuid())
  name  String
}
```

### Initialize your database

```bash
npx prisma migrate dev
```

### Install Prisma Client

```bash
npm i @prisma/client
```

> When you install Prisma Client, it automatically generates a c  lient for your defined models, if you need to regenerate the client, run `npx prisma generate`

```ts
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = client
}

export default client
```

- If you want to log, then use as follows

```ts
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'],
})
```

## NextAuth setup
- Install dep using `npm i next-auth`

To add NextAuth.js to our project, follow the different approches. This contains the dynamic route handler for NextAuth.js which will also contain all of your global NextAuth.js configurations.

1. old way - create a file like `pages/api/auth/[...nextauth].ts`

```ts
import NextAuth from "next-auth"

export default NextAuth(authOptions)
```

2. new way (for Next13) - create a file like `app/api/auth/[...nextauth]/route.ts`

```ts
import NextAuth from "next-auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
```

- the add necessary datas in `.env`

```bash
NEXTAUTH_SECRET=""
# other provider credencials
```

- `authOptions` sample in next-auth.

```ts
import { type NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", // even though jwt is the defualt option, if only we specify manually then only callbacks properly working.
  },
  providers: [], // providers list like google, github.
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: { // use if needed
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }
  },
}
```

- NextAuth with Prisma. add it same object itself. for understanding mentioned seperately.

```ts
import prisma from "@/prisma/client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma), 
}
```

- Copy paste the following code in prisma schema file and then migrate. for uptodate data refer docs.

```prisma
model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String?  @db.Text
  access_token       String?  @db.Text
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?  @db.Text
  session_state      String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

<br />
<br />

# Prisma Reference

```prisma
model User {
  id String @id @default(uuid()) // @id sets the primary key
  // id Int @id @default(autoincrement())
  email String @unique // @unique sets the field as unique
  name String? // ? optional
  createdAt DateTime @default(now()) // * default value (now)
  updatedAt DateTime @updatedAt // * auto update this field on update

  posts Post[] // * one user to many posts relation

  // ? BLOCK LEVEL ATTRIBUTE
  @@unique([age, name]) // now we cannot have two users with the same age and name
  @@index([email]) // index this field for faster queries when filtering and sorting
}

model Post {
  id String @id @default(uuid())
  title String
  content String?
  published Boolean @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // * one user to many posts relation
  author User @relation(fields: [authorId], references: [id])
  authorId String
}

```

### Enums
- define a custom enum type in your schema

```prisma
enum Role {
  USER
  ADMIN
}

model User {
  id String @id @default(uuid())
  role Role @default(USER)
}
```
## **CRUD** Operations

### CREATE

```ts
const createUser = await prisma.user.create({
  data: {
    name: 'Pam',
    email: 'pam@paper.com',
    age: 26,

    // * Create a userPreference object at the same time. (relation)
    userPreference: {
      create: {
        emailUpdates: true,
      },
    },
  },

  // * Include the userPreference object in the response
  // include: {
  //   userPreference: true,
  // },

  // * Only show the name and the id of userPreference in the response
  select: {
    name: true,
    userPreference: { select: { id: true } },
  },
})

const createUsers = await prisma.user.createMany({
  data: [
    {
      name: 'Michael',
      email: 'michael@paper.com',
      age: 41,
    },
    {
      name: 'Dwight',
      email: 'dwight@paper.com',
      age: 35,
    },
  ],

  // ? You can't use include or select with createMany
})
```

### UPDATE

```ts
// Update One
const updateOne = await prisma.user.update({
  where: {
    email: 'michael@paper.com',
  },

  data: {
    age: {
      increment: 1, // ? increment, decrement, multiply, divide, append, prepend, delete, remove, disconnect, connect, set
    },
  },
})

// Update Many
const updateMany = await prisma.user.updateMany({
  where: {
    age: { gt: 40 },
  },

  data: {
    email: '...@paper.com',
  },
})
```

### CONNECT, DISCONNECT, SET

```ts
// * CONNECT, DISCONNECT, SET
const connect = await prisma.user.update({
  where: {
    email: 'pam@paper.com',
  },

  data: {
    userPreference: {
      connect: {
        id: '9c7c2634-5cab-428d-8ca8-0db26bc3c684', // ? userPreferenceId from pam
      },
    },
  },
})

const disconnect = await prisma.user.update({
  where: {
    email: 'pam@paper.com',
  },

  data: {
    userPreference: {
      disconnect: true, // ? now pam's userPreference is null
    },
  },
})
```

### DELETE

```ts
// * delete all
const deleteAll = await prisma.user.deleteMany()

// * delete many that match a condition
const deleteAllUsersAged40Plus = await prisma.user.deleteMany({
  where: {
    age: { gt: 40 },
  },
})

// * delete one
// You need a unique identifier to delete one (you can setup a unique identifier in the schema.prisma file by adding @unique to the field)
const deleteOne = await prisma.user.delete({
  where: {
    email: 'pam@paper.com',
  },
})
```

### READ

```ts
// * READ
// * find all users
const findUsers = await prisma.user.findMany()

// * find one user by an unique field (email)
const findUser = await prisma.user.findUnique({
  where: {
    email: 'pam@paper.com',
  },
})

// * find user by multiple unique fields that we specified
// ? @@unique([age, name])
const findUserByMultipleUniqueFields = await prisma.user.findUnique({
  where: {
    age_name: {
      age: 26,
      name: 'Pam',
    },
  },
})

// * find users, sort and limit results
const findSortAndLimitResults = await prisma.user.findMany({
  take: 2, // limit
  skip: 1, // skip
  orderBy: {
    age: 'desc', // sort
  },
})

// ? findFirst - find a user by any field that is not unique
// ? distinct - return only distinct results (only first occurence of each result with a particular field)
```

## **FILTERS**

```ts
// * FILTERS
// * not
const notFilter = await prisma.user.findMany({
  where: {
    name: { not: 'Pam' },
  },
})

// * in, notIn
const inFilter = await prisma.user.findMany({
  where: {
    name: { in: ['Pam', 'Dwight'] },
  },
})

// * lt, lte, gt, gte
const ltFilter = await prisma.user.findMany({
  where: {
    age: { lt: 30 },
  },
})

// * contains, startsWith, endsWith
const containsFilter = await prisma.user.findMany({
  where: {
    name: { contains: 'a' },
  },
})

// * AND, OR, NOT
const andFilter = await prisma.user.findMany({
  where: {
    AND: [{ name: 'Pam' }, { age: { lt: 30 } }],
  },
})
