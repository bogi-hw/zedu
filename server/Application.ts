import {restfuncsExpress, ServerSessionOptions} from "restfuncs-server";
import {GreeterSession} from "./GreeterSession.js"
import helmet from "helmet";
import {createServer} from "vite";
import express from "express";
import http from "node:http";
import * as fs from "node:fs";
import * as vosk from 'vosk';



/**
 * Class for the application singleton (=one and only instance). You can store all **global** fixed configuration values and **global** state inside this class.
 * <p>
 * Access the application object via:
 * </p> 
 * <code><pre>
 * import {Application} from "....Application.js"
 * application. ... // <- do somethig with the global application object *
 * </pre></code>
 * 
 * Effects:
 *  - Starts a webserver on the specified port
 */
export class Application {
    // *** Configuration: ***
    port = 3000;
    voskModelPath = "vosk-model";

    // **** State: ****
    server?: http.Server;
    voskModel: typeof vosk.Model;

    constructor() {

        //Create vosk model:
        if (!fs.existsSync(this.voskModelPath)) {
            throw new Error("Vosk model does not exist. Please download the model from https://alphacephei.com/vosk/models and unpack under " + this.voskModelPath);
        }
        this.voskModel = new vosk.Model(this.voskModelPath);

        // Create and start web server:
        (async () => {

            const app = restfuncsExpress()

            app.use("/greeterAPI", GreeterSession.createExpressHandler() );

            // Client web:
            if (process.env.NODE_ENV === 'development') {
                // Serve web web through vite dev server:
                const viteDevServer = await createServer({
                    server: {
                        middlewareMode: true
                    },
                    root: "web",
                    base: "/",
                });
                app.use(viteDevServer.middlewares)
            } else {
                app.use(express.static('web/dist')) // Serve pre-built web (npm run build)      //TODO: app.use(helmet(),...) wieder reinnehmen - gibt momentan einen Fehler.
            }


            this.server = app.listen(this.port)
            console.log(`Server started: http://localhost:${this.port}`)

        })()

    }
}

/**
 * Single instance
 */
export const application = new Application();