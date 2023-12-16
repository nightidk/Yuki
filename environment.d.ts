declare global {
    namespace NodeJS {
        interface ProcessEnv {
            botToken: string;
            database: string;
            environment: "dev" | "prod" | "debug";
        }
    }
}

export {};