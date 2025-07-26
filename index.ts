import "expo-router/entry";

import { createServer, Response, Server } from "miragejs";

declare global {
    interface Window {
        server: Server
    }
}

if (__DEV__) {
    if (window.server) {
        window.server.shutdown();
    }

    window.server = createServer({
        routes() {
            this.post("/login", (schema, request) => {
                const { username, password } = JSON.parse(request.requestBody);

                if (username === "stitch" && password === "1234") {
                    return {
                        accessToken: "access-token",
                        refreshToken: "refresh-token",
                        user: {

                            id: "stitch",
                            name: "skaxodn",
                            description: "I'm mobile developer",
                            profileImageUrl: "https://avatars.githubusercontent.com/u/66770613?v=4"
                        }
                    }
                } else {
                    return new Response(401, {}, { message: "Invalid credentials"} );
                }
            })
        }
    });
}