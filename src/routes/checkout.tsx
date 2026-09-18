import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";

const CHECKOUT = {
  productName: "Mentoria Projeto dos 100K",
  subtitle: "Acesso à mentoria e aos materiais da oferta atual.",
  price: "R$ 59,98",
  installments: "12x de R$ 5,00",
  paymentLink: "https://pay.kiwify.com.br/i5C8OzN",

  // Troque estes dois valores quando você enviar o QR Code e o código PIX.
  pixQrImage: "",
  pixCopyPaste: "",

  // Textos do banner: totalmente editáveis aqui.
  bannerTexts: ["O NOVO JOGO", "0 AO 100K FACIL", "APROVEITA A OPORTUNIDADE"],
};

type PaymentMethod = "card" | "pix";

const installmentOptions = Array.from({ length: 12 }, (_, index) => index + 1);

const styles = {
  page: {
    minHeight: "100vh",
    background: "#050505",
    color: "#111",
    padding: "20px 14px 70px",
    fontFamily: "Arial, Helvetica, sans-serif",
  } as React.CSSProperties,
  shell: { width: "min(1120px,100%)", margin: "0 auto" } as React.CSSProperties,
  banner: {
    overflow: "hidden",
    height: 58,
    borderRadius: 14,
    background: "linear-gradient(90deg,#ff7a30 0%,#f94f17 52%,#ff5a24 100%)",
    boxShadow: "0 10px 34px rgba(249,79,23,.18)",
    display: "flex",
    alignItems: "center",
    marginBottom: 18,
  } as React.CSSProperties,
  bannerTrack: {
    display: "flex",
    width: "max-content",
    gap: 42,
    paddingLeft: 18,
    whiteSpace: "nowrap",
    alignItems: "center",
    animation: "checkoutBanner 24s linear infinite",
  } as React.CSSProperties,
  bannerText: {
    color: "#fff",
    fontWeight: 800,
    fontSize: 15,
    letterSpacing: ".06em",
    textTransform: "uppercase" as const,
  } as React.CSSProperties,
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    marginBottom: 18,
    color: "#fff",
  } as React.CSSProperties,
  brand: {
    fontWeight: 900,
    letterSpacing: ".08em",
    textTransform: "uppercase" as const,
    fontSize: 13,
  } as React.CSSProperties,
  back: { color: "#fff", textDecoration: "none", opacity: .75, fontSize: 14 } as React.CSSProperties,
  card: {
    display: "grid",
    gridTemplateColumns: "minmax(300px,.9fr) minmax(0,1.3fr)",
    background: "#fff",
    borderRadius: 24,
    overflow: "hidden",
    boxShadow: "0 28px 90px rgba(0,0,0,.48),0 0 34px rgba(249,79,23,.1)",
  } as React.CSSProperties,
  summary: {
    padding: "38px 32px",
    background: "linear-gradient(180deg,#111 0%,#080808 100%)",
    color: "#fff",
  } as React.CSSProperties,
  badge: {
    display: "inline-flex",
    padding: "7px 12px",
    borderRadius: 999,
    background: "rgba(249,79,23,.12)",
    border: "1px solid rgba(249,79,23,.3)",
    color: "#ff6a2a",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: ".08em",
    textTransform: "uppercase" as const,
  } as React.CSSProperties,
  title: {
    fontSize: "clamp(30px,4vw,48px)",
    lineHeight: 1,
    margin: "20px 0 14px",
    fontWeight: 900,
  } as React.CSSProperties,
  orange: { color: "#f94f17" } as React.CSSProperties,
  price: { marginTop: 28, fontSize: "clamp(40px,5vw,58px)", lineHeight: 1, fontWeight: 900 } as React.CSSProperties,
  small: { marginTop: 8, color: "rgba(255,255,255,.68)", fontSize: 14 } as React.CSSProperties,
  timerBox: {
    marginTop: 26,
    padding: "16px 18px",
    borderRadius: 16,
    border: "1px solid rgba(249,79,23,.28)",
    background: "rgba(249,79,23,.07)",
  } as React.CSSProperties,
  timerLabel: { color: "rgba(255,255,255,.68)", fontSize: 12, marginBottom: 7 } as React.CSSProperties,
  timer: { fontSize: 34, lineHeight: 1, fontWeight: 900, letterSpacing: ".08em" } as React.CSSProperties,
  form: { padding: "30px clamp(20px,4vw,38px) 34px" } as React.CSSProperties,
  sectionTitle: { margin: 0, fontSize: 27, fontWeight: 900 } as React.CSSProperties,
  muted: { margin: "7px 0 0", color: "#6f6f6f", fontSize: 14 } as React.CSSProperties,
  methodRow: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, margin: "24px 0 20px" } as React.CSSProperties,
  method: {
    border: "1px solid #dfdfdf",
    borderRadius: 14,
    padding: "14px 10px",
    textAlign: "center" as const,
    fontWeight: 900,
    background: "#fff",
    cursor: "pointer",
  } as React.CSSProperties,
  activeMethod: {
    border: "2px solid #f94f17",
    background: "#fff7f3",
    color: "#c53f0d",
    boxShadow: "0 8px 22px rgba(249,79,23,.1)",
  } as React.CSSProperties,
  label: { display: "block", fontSize: 12, fontWeight: 800, marginBottom: 7, color: "#222" } as React.CSSProperties,
  input: {
    width: "100%",
    boxSizing: "border-box" as const,
    border: "1px solid #d9d9d9",
    borderRadius: 12,
    padding: "14px 13px",
    fontSize: 15,
    outline: "none",
    marginBottom: 14,
    background: "#fff",
  } as React.CSSProperties,
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } as React.CSSProperties,
  panel: { border: "1px solid #ececec", borderRadius: 18, padding: 18, background: "#fafafa", marginBottom: 18 } as React.CSSProperties,
  panelTitle: { fontWeight: 900, fontSize: 15, marginBottom: 8 } as React.CSSProperties,
  panelText: { color: "#666", fontSize: 13, lineHeight: 1.55, margin: 0 } as React.CSSProperties,
  qr: {
    width: 220,
    height: 220,
    maxWidth: "100%",
    objectFit: "contain",
    display: "block",
    margin: "15px auto",
    borderRadius: 14,
    border: "1px solid #e6e6e6",
    background: "#fff",
  } as React.CSSProperties,
  qrPlaceholder: {
    width: 220,
    height: 220,
    maxWidth: "100%",
    margin: "15px auto",
    borderRadius: 14,
    border: "1px dashed #cfcfcf",
    background: "#fff",
    display: "grid",
    placeItems: "center",
    textAlign: "center" as const,
    padding: 20,
    boxSizing: "border-box" as const,
    color: "#888",
    fontSize: 13,
  } as React.CSSProperties,
  code: {
    width: "100%",
    boxSizing: "border-box" as const,
    minHeight: 84,
    border: "1px solid #ddd",
    borderRadius: 12,
    padding: 12,
    fontFamily: "monospace",
    fontSize: 12,
    color: "#333",
    background: "#fff",
    resize: "vertical" as const,
  } as React.CSSProperties,
  total: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    padding: "17px 0",
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
  } as React.CSSProperties,
  secure: { marginTop: 13, textAlign: "center" as const, color: "#777", fontSize: 12 } as React.CSSProperties,
};

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [installments, setInstallments] = useState(12);
  const [secondsLeft, setSecondsLeft] = useState(59 * 60 + 59);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => (current > 0 ? current - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <div style={styles.banner}>
          <div style={styles.bannerTrack}>
            {[...CHECKOUT.bannerTexts, ...CHECKOUT.bannerTexts].map((text, index) => (
              <span style={styles.bannerText} key={index}>{text}</span>
            ))}
          </div>
        </div>

        <div style={styles.topbar}>
          <div style={styles.brand}>Projeto dos 100K</div>
          <Link to="/" style={styles.back}>← Voltar para a página</Link>
        </div>

        <section className="checkout-card" style={styles.card}>
          <aside style={styles.summary}>
            <div style={styles.badge}>Inscrição segura</div>
            <h1 style={styles.title}>
              Garanta seu acesso à <span style={styles.orange}>mentoria</span>.
            </h1>
            <p style={{ margin: 0, color: "rgba(255,255,255,.74)", lineHeight: 1.6 }}>
              {CHECKOUT.subtitle}
            </p>

            <div style={styles.price}>{CHECKOUT.price}</div>
            <div style={styles.small}>{CHECKOUT.installments} ou {CHECKOUT.price} à vista</div>

            <div style={styles.timerBox}>
              <div style={styles.timerLabel}>Aguardando pagamento</div>
              <div style={styles.timer}>{minutes}:{seconds}</div>
            </div>

            <div style={{ marginTop: 26, display: "grid", gap: 10 }}>
              {["Acesso à mentoria", "Aulas e materiais atualizados", "Pagamento seguro"].map((item) => (
                <div key={item} style={{ color: "rgba(255,255,255,.84)", fontSize: 14 }}>✓ {item}</div>
              ))}
            </div>
          </aside>

          <div style={styles.form}>
            <h2 style={styles.sectionTitle}>Finalizar inscrição</h2>
            <p style={styles.muted}>Preencha seus dados e escolha uma forma de pagamento.</p>

            <div style={styles.methodRow}>
              {([
                ["card", "Cartão"],
                ["pix", "PIX"],
              ] as const).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setMethod(value)}
                  style={{ ...styles.method, ...(method === value ? styles.activeMethod : {}) }}
                  aria-pressed={method === value}
                >
                  {label}
                </button>
              ))}
            </div>

            <label style={styles.label}>Nome completo</label>
            <input style={styles.input} placeholder="Digite seu nome" />

            <label style={styles.label}>E-mail</label>
            <input style={styles.input} type="email" placeholder="seuemail@exemplo.com" />

            <label style={styles.label}>CPF</label>
            <input style={styles.input} placeholder="000.000.000-00" />

            <label style={styles.label}>Celular</label>
            <input style={styles.input} placeholder="(00) 00000-0000" />

            {method === "pix" && (
              <div style={styles.panel}>
                <div style={styles.panelTitle}>Pagamento via PIX</div>
                <p style={styles.panelText}>
                  O QR Code e o código copia e cola ficarão nesta mesma tela. Você poderá alterar os dados no objeto CHECKOUT acima.
                </p>

                {CHECKOUT.pixQrImage ? (
                  <img src={CHECKOUT.pixQrImage} alt="QR Code PIX" style={styles.qr} />
                ) : (
                  <div style={styles.qrPlaceholder}>QR CODE PIX<br />aguardando o arquivo</div>
                )}

                <label style={styles.label}>Código PIX copia e cola</label>
                <textarea
                  style={styles.code}
                  readOnly
                  value={CHECKOUT.pixCopyPaste || "Informe o código PIX em CHECKOUT.pixCopyPaste"}
                />
              </div>
            )}

            {method === "card" && (
              <div style={{ ...styles.panel, background: "#fff", border: "1px solid #e7e7e7", boxShadow: "0 14px 32px rgba(0,0,0,.07)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div>
                    <div style={styles.panelTitle}>Dados do cartão</div>
                    <p style={{ ...styles.panelText, margin: 0 }}>Preencha os dados para finalizar sua inscrição.</p>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 900, color: "#666" }}>🔒 Seguro</div>
                </div>

                <div style={{
                  borderRadius: 18,
                  padding: 18,
                  background: "linear-gradient(135deg,#151515 0%,#2a2a2a 100%)",
                  color: "#fff",
                  boxShadow: "0 16px 28px rgba(0,0,0,.16)",
                  marginBottom: 18,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                    <span style={{ fontSize: 11, letterSpacing: ".14em", opacity: .65 }}>CARTÃO</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: "#ff7a30" }}>{installments}x de R$ {(59.98 / installments).toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div style={{ marginTop: 34, fontFamily: "monospace", fontSize: 18, letterSpacing: ".12em" }}>
                    •••• •••• •••• ••••
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 18, fontSize: 11, opacity: .75 }}>
                    <span>NOME NO CARTÃO</span>
                    <span>MM/AA</span>
                  </div>
                </div>

                <label style={styles.label}>Número do cartão</label>
                <input
                  style={{ ...styles.input, fontSize: 17, letterSpacing: ".08em" }}
                  placeholder="0000 0000 0000 0000"
                  inputMode="numeric"
                  autoComplete="cc-number"
                />

                <div style={styles.grid2}>
                  <div>
                    <label style={styles.label}>Mês / Ano</label>
                    <input
                      style={styles.input}
                      placeholder="MM / AA"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                    />
                  </div>
                  <div>
                    <label style={styles.label}>Código de segurança</label>
                    <input
                      style={styles.input}
                      placeholder="CVV"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                    />
                  </div>
                </div>

                <label style={styles.label}>Escolha o número de parcelas</label>
                <select
                  value={installments}
                  onChange={(event) => setInstallments(Number(event.target.value))}
                  style={{
                    ...styles.input,
                    appearance: "none",
                    marginBottom: 8,
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                  aria-label="Escolha o número de parcelas"
                >
                  {installmentOptions.map((count) => {
                    const amount = (59.98 / count).toFixed(2).replace(".", ",");
                    return (
                      <option key={count} value={count}>
                        {count}x de R$ {amount}
                      </option>
                    );
                  })}
                </select>

                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", paddingTop: 6 }}>
                  <span style={{ fontSize: 12, color: "#777" }}>Parcelamento escolhido</span>
                  <strong style={{ color: "#111", fontSize: 15 }}>
                    {installments}x de R$ {(59.98 / installments).toFixed(2).replace(".", ",")}
                  </strong>
                </div>
              </div>
            )}

            <div style={styles.total}>
              <span style={{ fontWeight: 700, color: "#666" }}>Total da inscrição</span>
              <strong style={{ fontSize: 27 }}>{CHECKOUT.price}</strong>
            </div>

            <a href={CHECKOUT.paymentLink} target="_blank" rel="noreferrer" style={styles.button}>
              CONTINUAR PARA O PAGAMENTO
            </a>

            <div style={styles.secure}>
              🔒 Ambiente de pagamento seguro • {CHECKOUT.productName}
            </div>
          </div>
        </section>

        <div style={{ marginTop: 18, color: "rgba(255,255,255,.42)", textAlign: "center", fontSize: 12 }}>
          Textos, valores, banner e dados do PIX ficam concentrados no objeto CHECKOUT deste arquivo para facilitar a edição.
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: "@keyframes checkoutBanner{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}@media(max-width:820px){.checkout-card{grid-template-columns:1fr!important}}@media(max-width:600px){.checkout-card{border-radius:18px!important}}"}} />
    </main>
  );
}
