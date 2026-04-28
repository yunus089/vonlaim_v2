import type { Metadata } from "next";
import { loginAction } from "@/app/admin/login/actions";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false
  }
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;

  return (
    <main className="admin-page login-wrap">
      <form action={loginAction} className="login-panel form-grid">
        <div>
          <span className="eyebrow">Admin</span>
          <h1 style={{ fontSize: "2.4rem" }}>vonLaim Dashboard</h1>
          <p className="muted">
            Geschützter Bereich für Inhalte, Blog, SEO-Felder und Anfragen.
          </p>
        </div>
        {error ? (
          <p className="status draft">Login nicht erkannt. Bitte prüfen.</p>
        ) : null}
        <div className="field">
          <label htmlFor="email">E-Mail</label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="password">Passwort</label>
          <input id="password" name="password" type="password" required autoComplete="current-password" />
        </div>
        <button className="btn btn-accent" type="submit">
          Einloggen
        </button>
      </form>
    </main>
  );
}
