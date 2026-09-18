import { createFileRoute, Link } from "@tanstack/react-router";
import React from "react";

const CHECKOUT = {
  productName: "Mentoria Projeto dos 100K",
  subtitle: "Acesso à mentoria e materiais da oferta atual",
  price: "R$ 59,98",
  installments: "12x de R$ 5,00",
  paymentLink: "https://pay.kiwify.com.br/i5C8OzN",
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#070707",
    color: "#111",
    padding: "40px 18px 70px",
    fontFamily: "Arial, Helvetica, sans-serif",
  } as React.CSSProperties,
  shell: {
    width: "min(1080px, 100%)",
    margin: "0 auto",
  } as React.CSSProperties,
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
    color: "#fff",
  } as React.CSSProperties,
  brand: {
    fontWeight: 800,
    letterSpacing: ".08em",
    textTransform: "uppercase" as const,
    fontSize: 13,
  } as React.CSSProperties,
  back: {
    color: "#fff",
    textDecoration: "none",
    opacity: .78,
    fontSize: 14,
  } as React.CSSProperties,
  card: {
    display: "grid",
    gridTemplateColumns: "1fr 1.25fr",
    background: "#fff",
    borderRadius: 24,
    overflow: "hidden",
    boxShadow: "0 30px 90px rgba(0,0,0,.48), 0 0 40px rgba(249,79,23,.12)",
  } as React.CSSProperties,
  summary: {
    padding: 36,
    background: "linear-gradient(180deg,#111 0%,#080808 100%)",
    color: "#fff",
  } as React.CSSProperties,
  badge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "7px 12px",
    borderRadius: 999,
    background: "rgba(249,79,23,.12)",
    border: "1px solid rgba(249,79,23,.3)",
    color: "#ff6a2a",
    fontSize: 12,
    fontWeight: 800,
    textTransform: "uppercase" as const,
    letterSpacing: ".08em",
  } as React.CSSProperties,
  title: {
    fontSize: "clamp(30px,4vw,46px)",
    lineHeight: 1,
    margin: "20px 0 12px",
    fontWeight: 900,
  } as React.CSSProperties,
  orange: { color: "#f94f17" } as React.CSSProperties,
  price: {
    marginTop: 32,
    fontSize: 48,
    lineHeight: 1,
    fontWeight: 900,
  } as React.CSSProperties,
  small: {
    marginTop: 8,
    color: "rgba(255,255,255,.66)",
    fontSize: 14,
  } as React.CSSProperties,
  form: {
    padding: 36,
  } as React.CSSProperties,
  sectionTitle: {
    margin: "0 0 8px",
    fontSize: 26,
    fontWeight: 900,
  } as React.CSSProperties,
  muted: {
    margin: 0,
    color: "#666",
    fontSize: 14,
  } as React.CSSProperties,
  methodRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 10,
    margin: "24px 0",
  } as React.CSSProperties,
  method: {
    border: "1px solid #ddd",
    borderRadius: 14,
    padding: "13px 10px",
    textAlign: "center" as const,
    fontWeight: 800,
    background: "#fff",
  } as React.CSSProperties,
  activeMethod: {
    border: "2px solid #f94f17",
    background: "#fff7f2",
    color: "#c53f0d",
  } as React.CSSProperties,
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 800,
    marginBottom: 7,
  } as React.CSSProperties,
  input: {
    width: "100%",
    boxSizing: "border-box" as const,
    border: "1px solid #d9d9d9",
    borderRadius: 12,
    padding: "14px 13px",
    fontSize: 15,
    outline: "none",
    marginBottom: 14,
  } as React.CSSProperties,
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  } as React.CSSProperties,
  total: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    padding: "17px 0",
    marginTop: 8,
    borderTop: "1px solid #eee",
    borderBottom: "1px solid #eee",
  } as React.CSSProperties,
  button: {
    display: "block",
    width: "100%",
    border: 0,
    borderRadius: 14,
    background: "linear-gradient(90deg,#ff6a2a,#f94f17)",
    color: "#fff",
    padding: "16px 18px",
    fontWeight: 900,
    fontSize: 16,
    textAlign: "center" as const,
    textDecoration: "none",
    marginTop: 18,
    cursor: "pointer",
  } as React.CSSProperties,
  secure: {
    marginTop: 14,
    textAlign: "center" as const,
    color: "#777",
    fontSize: 12,
  } as React.CSSProperties,
};

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <div style={styles.topbar}>
          <div style={styles.brand}>Projeto dos 100K</div>
          <Link to="/" style={styles.back}>← Voltar para a página</Link>
        </div>

        <section style={styles.card}>
          <aside style={styles.summary}>
            <div style={styles.badge}>Inscrição</div>
            <h1 style={styles.title}>
              Garanta seu acesso à <span style={styles.orange}>mentoria</span>.
            </h1>
            <p style={{ margin: 0, color: "rgba(255,255,255,.74)", lineHeight: 1.6 }}>
              {CHECKOUT.subtitle}
            </p>

            <div style={styles.price}>{CHECKOUT.price}</div>
            <div style={styles.small}>{CHECKOUT.installments} ou {CHECKOUT.price} à vista</div>

            <div style={{ marginTop: 30, display: "grid", gap: 10 }}>
              {[
                "Acesso à mentoria",
                "Materiais e aulas atualizadas",
                "Pagamento em ambiente seguro",
              ].map((item) => (
                <div key={item} style={{ color: "rgba(255,255,255,.82)", fontSize: 14 }}>
                  ✓ {item}
                </div>
              ))}
            </div>
          </aside>

          <div style={styles.form}>
            <h2 style={styles.sectionTitle}>Finalizar inscrição</h2>
            <p style={styles.muted}>Escolha uma forma de pagamento e confira seus dados.</p>

            <div style={styles.methodRow}>
              <div style={{ ...styles.method, ...styles.activeMethod }}>PIX</div>
              <div style={styles.method}>Cartão</div>
              <div style={styles.method}>Boleto</div>
            </div>

            <label style={styles.label}>Nome completo</label>
            <input style={styles.input} placeholder="Digite seu nome" />

            <label style={styles.label}>E-mail</label>
            <input style={styles.input} type="email" placeholder="seuemail@exemplo.com" />

            <label style={styles.label}>CPF</label>
            <input style={styles.input} placeholder="000.000.000-00" />

            <div style={styles.grid2}>
              <div>
                <label style={styles.label}>Celular</label>
                <input style={styles.input} placeholder="(00) 00000-0000" />
              </div>
              <div>
                <label style={styles.label}>CEP</label>
                <input style={styles.input} placeholder="00000-000" />
              </div>
            </div>

            <div style={styles.total}>
              <span style={{ fontWeight: 700, color: "#666" }}>Total da inscrição</span>
              <strong style={{ fontSize: 26 }}>{CHECKOUT.price}</strong>
            </div>

            <a
              href={CHECKOUT.paymentLink}
              target="_blank"
              rel="noreferrer"
              style={styles.button}
            >
              CONTINUAR PARA O PAGAMENTO
            </a>

            <div style={styles.secure}>
              🔒 Você será encaminhado para o checkout de pagamento.
            </div>
          </div>
        </section>

        <div style={{ marginTop: 18, color: "rgba(255,255,255,.45)", textAlign: "center", fontSize: 12 }}>
          Todos os textos, valores, cores e estilos desta tela ficam concentrados neste arquivo para facilitar a edição.
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .checkout-card {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
