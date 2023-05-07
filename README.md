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