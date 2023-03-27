declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string
    SHADOW_DATABASE_URL: string
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
    GITHUB_CLIENT_ID: string
    GITHUB_CLIENT_SECRET: string
    NEXTAUTH_SECRET: string
  }
}
