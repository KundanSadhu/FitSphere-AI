import { createApp } from "../backend/app.js";

let app: any = null;

export default async function handler(req: any, res: any) {
  if (!app) {
    app = await createApp();
  }
  return app(req, res);
}
