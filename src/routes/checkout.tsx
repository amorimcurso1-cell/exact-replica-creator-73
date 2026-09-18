import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useMemo, useState } from "react";

const CHECKOUT = {
  productName: "Mentoria Projeto dos 100K",
  price: 59.98,
  paymentLink: "https://pay.kiwify.com.br/i5C8OzN",

  // Preencha estes campos quando enviar o QR Code e o código PIX.
  pixQrImage: "",
  pixCopyPaste: "",

  // Textos do banner: totalmente editáveis aqui.
  bannerTexts: ["O NOVO JOGO", "0 AO 100K FACIL", "APROVEITA A OPORTUNIDADE"],
};

const installmentOptions = Array.from({ length: 12 }, (_, index) => index + 1);
type PaymentMode = "pix" | "card" | "split";
type SplitBase = "pix" | "card";

const money = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const styles = {
  page: {
    minHeight: "100vh",
    background: "#050505",
    color: "#111",
    padding: "18px 14px 70px",
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
    marginBottom: 22,
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
    marginBottom: 16,
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
    gridTemplateColumns: "minmax(300px,.86fr) minmax(0,1.3fr)",
    background: "#fff",
    borderRadius: 24,
    overflow: "hidden",
    boxShadow: "0 28px 90px rgba(0,0,0,.48),0 0 34px rgba(249,79,23,.1)",
  } as React.CSSProperties,
  summary: {
    padding: "34px 30px",
    background: "linear-gradient(180deg,#111 0%,#080808 100%)",
    color: "#fff",
    textAlign: "center" as const,
  } as React.CSSProperties,
  title: {
    fontSize: "clamp(30px,4vw,48px)",
    lineHeight: 1,
    margin: "0 auto 14px",
    fontWeight: 900,
    maxWidth: 430,
  } as React.CSSProperties,
  orange: { color: "#f94f17" } as React.CSSProperties,
  price: { marginTop: 22, fontSize: "clamp(40px,5vw,58px)", lineHeight: 1, fontWeight: 900 } as React.CSSProperties,
  small: { marginTop: 8, color: "rgba(255,255,255,.68)", fontSize: 14 } as React.CSSProperties,
  timerBox: {
    margin: "0 auto 24px",
    padding: "14px 18px",
    borderRadius: 16,
    border: "1px solid rgba(249,79,23,.28)",
    background: "rgba(249,79,23,.07)",
    width: "min(100%,250px)",
  } as React.CSSProperties,
  timerLabel: { color: "rgba(255,255,255,.68)", fontSize: 12, marginBottom: 7 } as React.CSSProperties,
  timer: { fontSize: 34, lineHeight: 1, fontWeight: 900, letterSpacing: ".08em" } as React.CSSProperties,
  form: { padding: "28px clamp(18px,4vw,38px) 34px" } as React.CSSProperties,
  sectionTitle: { margin: 0, fontSize: 27, fontWeight: 900, textAlign: "center" as const } as React.CSSProperties,
  muted: { margin: "7px 0 0", color: "#6f6f6f", fontSize: 14, textAlign: "center" as const } as React.CSSProperties,
  methodRow: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, margin: "24px 0 16px" } as React.CSSProperties,
  method: {
    border: "1px solid #dfdfdf",
    borderRadius: 14,
    padding: "14px 10px",
    textAlign: "center" as const,
    fontWeight: 900,
    background: "#fff",
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
    padding: "13px 13px",
    fontSize: 15,
    outline: "none",
    marginBottom: 12,
    background: "#fff",
  } as React.CSSProperties,
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } as React.CSSProperties,
  panel: {
    border: "1px solid #ececec",
    borderRadius: 18,
    padding: 18,
    background: "#fafafa",
    marginBottom: 16,
  } as React.CSSProperties,
  panelTitle: { fontWeight: 900, fontSize: 15, marginBottom: 8 } as React.CSSProperties,
  panelText: { color: "#666", fontSize: 13, lineHeight: 1.55, margin: 0 } as React.CSSProperties,
  qr: {
    width: 210,
    height: 210,
    maxWidth: "100%",
    objectFit: "contain",
    display: "block",
    margin: "15px auto",
    borderRadius: 14,
    border: "1px solid #e6e6e6",
    background: "#fff",
  } as React.CSSProperties,
  qrPlaceholder: {
    width: 210,
    height: 210,
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
  } as React.CSSProperties,
  secure: { marginTop: 13, textAlign: "center" as const, color: "#777", fontSize: 12 } as React.CSSProperties,
};

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("card");
  const [splitBase, setSplitBase] = useState<SplitBase>("pix");
  const [splitAmount, setSplitAmount] = useState(CHECKOUT.price / 2);
  const [installments, setInstallments] = useState(12);
  const [secondsLeft, setSecondsLeft] = useState(59 * 60 + 59);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => (current > 0 ? current - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const pixAmount = useMemo(
    () =>
      splitBase === "pix"
        ? Math.min(CHECKOUT.price, Math.max(0, splitAmount))
        : Math.max(0, CHECKOUT.price - splitAmount),
    [splitAmount, splitBase],
  );

  const cardAmount = useMemo(
    () => Math.max(0, CHECKOUT.price - pixAmount),
    [pixAmount],
  );

  const cardPerInstallment = installments
    ? cardAmount / installments
    : cardAmount;

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  const handleAmountChange = (value: string) => {
    const parsed = Number(value.replace(",", "."));
    if (!Number.isFinite(parsed)) {
      setSplitAmount(0);
      return;
    }
    setSplitAmount(Math.min(CHECKOUT.price, Math.max(0, parsed)));
  };

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
            <div style={styles.timerBox}>
              <div style={styles.timerLabel}>Tempo reservado para concluir o pagamento</div>
              <div style={styles.timer}>{minutes}:{seconds}</div>
            </div>

            <h1 style={styles.title}>
              Garanta seu acesso à <span style={styles.orange}>mentoria</span>
            </h1>

            <div style={styles.price}>{money(CHECKOUT.price)}</div>
            <div style={styles.small}>
              Você pode combinar PIX e Cartão como preferir.
            </div>

            <div style={{ marginTop: 26, display: "grid", gap: 10, textAlign: "left" as const }}>
              {["Pagamento com PIX + Cartão", "Parcelamento no cartão", "Ambiente seguro"].map((item) => (
                <div key={item} style={{ color: "rgba(255,255,255,.84)", fontSize: 14 }}>✓ {item}</div>
              ))}
            </div>
          </aside>

          <div style={styles.form}>
            <h2 style={styles.sectionTitle}>FORMAS DE PAGAMENTO</h2>
            <p style={styles.muted}>Escolha uma opção para continuar.</p>

            <div style={styles.methodRow}>
              {([
                ["card", "💳 Cartão"],
                ["pix", "PIX"],
                ["split", "💳 + PIX"],
              ] as const).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setPaymentMode(value)}
                  style={{ ...styles.method, ...(paymentMode === value ? styles.activeMethod : {}) }}
                  aria-pressed={paymentMode === value}
                >
                  {value === "pix" ? (
                    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      <span aria-hidden="true" style={{
                        display: "inline-flex",
                        width: 20,
                        height: 20,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 5,
                        background: "#32bcad",
                        color: "#fff",
                        fontWeight: 900,
                        fontSize: 11,
                        lineHeight: 1,
                      }}>P</span>
                      PIX
                    </span>
                  ) : label}
                </button>
              ))}
            </div>

            {paymentMode === "split" && (
            <div style={{ ...styles.panel, background: "#fff" }}>
              <div style={styles.panelTitle}>Como deseja dividir os {money(CHECKOUT.price)}?</div>
              <p style={styles.panelText}>
                Escolha quanto vai no PIX ou quanto vai no cartão. O restante é calculado automaticamente.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 15, marginBottom: 15 }}>
                <button
                  type="button"
                  onClick={() => setSplitBase("pix")}
                  style={{
                    ...styles.method,
                    ...(splitBase === "pix" ? styles.activeMethod : {}),
                  }}
                >
                  Definir valor do PIX
                </button>
                <button
                  type="button"
                  onClick={() => setSplitBase("card")}
                  style={{
                    ...styles.method,
                    ...(splitBase === "card" ? styles.activeMethod : {}),
                  }}
                >
                  Definir valor do cartão
                </button>
              </div>

              <label style={styles.label}>
                {splitBase === "pix" ? "Valor que vai no PIX" : "Valor que vai no cartão"}
              </label>

              <input
                style={{ ...styles.input, fontSize: 19, fontWeight: 900 }}
                value={splitAmount.toFixed(2).replace(".", ",")}
                onChange={(event) => handleAmountChange(event.target.value)}
                inputMode="decimal"
                aria-label={splitBase === "pix" ? "Valor do PIX" : "Valor do cartão"}
              />

              <input
                type="range"
                min="0"
                max={CHECKOUT.price}
                step="0.01"
                value={splitAmount}
                onChange={(event) => setSplitAmount(Number(event.target.value))}
                style={{ width: "100%", accentColor: "#f94f17" }}
                aria-label="Divisão do pagamento"
              />

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginTop: 16,
              }}>
                <div style={{ padding: 14, borderRadius: 14, background: "#f5f5f5" }}>
                  <div style={{ color: "#777", fontSize: 11, fontWeight: 800, textTransform: "uppercase" }}>PIX</div>
                  <strong style={{ display: "block", marginTop: 5, fontSize: 22 }}>{money(pixAmount)}</strong>
                </div>
                <div style={{ padding: 14, borderRadius: 14, background: "#f5f5f5" }}>
                  <div style={{ color: "#777", fontSize: 11, fontWeight: 800, textTransform: "uppercase" }}>Cartão</div>
                  <strong style={{ display: "block", marginTop: 5, fontSize: 22 }}>{money(cardAmount)}</strong>
                </div>
              </div>
            </div>
            )}

            <label style={styles.label}>Nome completo</label>
            <input style={styles.input} placeholder="Digite seu nome" autoComplete="name" />

            <label style={styles.label}>E-mail</label>
            <input style={styles.input} type="email" placeholder="seuemail@exemplo.com" autoComplete="email" />

            <label style={styles.label}>CPF</label>
            <input style={styles.input} placeholder="000.000.000-00" inputMode="numeric" autoComplete="off" />

            <label style={styles.label}>Celular</label>
            <input style={styles.input} placeholder="(00) 00000-0000" inputMode="tel" autoComplete="tel" />

            {paymentMode === "card" && (
              <div style={{ ...styles.panel, background: "#fff" }}>
                <div style={styles.panelTitle}>💳 Pagamento com cartão</div>

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
                    <input style={styles.input} placeholder="MM / AA" inputMode="numeric" autoComplete="cc-exp" />
                  </div>
                  <div>
                    <label style={styles.label}>Código de segurança</label>
                    <input style={styles.input} placeholder="CVV" inputMode="numeric" autoComplete="cc-csc" />
                  </div>
                </div>

                <label style={styles.label}>Parcelas</label>
                <select
                  value={installments}
                  onChange={(event) => setInstallments(Number(event.target.value))}
                  style={{ ...styles.input, appearance: "none", fontWeight: 800, cursor: "pointer" }}
                >
                  {installmentOptions.map((count) => (
                    <option key={count} value={count}>
                      {count}x de {money(CHECKOUT.price / count)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {paymentMode === "pix" && (
              <div style={{ ...styles.panel, background: "#fff", textAlign: "center" as const }}>
                <div style={styles.panelTitle}>PIX</div>
                {CHECKOUT.pixQrImage ? (
                  <img src={CHECKOUT.pixQrImage} alt="QR Code PIX" style={styles.qr} />
                ) : (
                  <div style={styles.qrPlaceholder}>QR CODE PIX<br />aguardando o arquivo</div>
                )}
                <label style={{ ...styles.label, textAlign: "left" as const }}>Código PIX copia e cola</label>
                <textarea
                  style={styles.code}
                  readOnly
                  value={CHECKOUT.pixCopyPaste || "Informe o código PIX em CHECKOUT.pixCopyPaste"}
                />
              </div>
            )}

            {paymentMode === "split" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div style={{ ...styles.panel, background: "#fff" }}>
                  <div style={styles.panelTitle}>💳 Cartão</div>
                  <label style={styles.label}>Número do cartão</label>
                  <input style={{ ...styles.input, fontSize: 17, letterSpacing: ".08em" }} placeholder="0000 0000 0000 0000" inputMode="numeric" autoComplete="cc-number" />
                  <div style={styles.grid2}>
                    <div>
                      <label style={styles.label}>Mês / Ano</label>
                      <input style={styles.input} placeholder="MM / AA" inputMode="numeric" autoComplete="cc-exp" />
                    </div>
                    <div>
                      <label style={styles.label}>Código de segurança</label>
                      <input style={styles.input} placeholder="CVV" inputMode="numeric" autoComplete="cc-csc" />
                    </div>
                  </div>
                  <label style={styles.label}>Parcelas no cartão</label>
                  <select
                    value={installments}
                    onChange={(event) => setInstallments(Number(event.target.value))}
                    style={{ ...styles.input, appearance: "none", fontWeight: 800, cursor: "pointer" }}
                  >
                    {installmentOptions.map((count) => (
                      <option key={count} value={count}>
                        {count}x de {money(cardPerInstallment)}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ ...styles.panel, background: "#fff", textAlign: "center" as const }}>
                  <div style={styles.panelTitle}>PIX</div>
                  <p style={styles.panelText}>Valor no PIX: <strong style={{ color: "#111" }}>{money(pixAmount)}</strong></p>
                  {pixAmount > 0 ? (
                    <>
                      {CHECKOUT.pixQrImage ? (
                        <img src={CHECKOUT.pixQrImage} alt="QR Code PIX" style={styles.qr} />
                      ) : (
                        <div style={styles.qrPlaceholder}>QR CODE PIX<br />aguardando o arquivo</div>
                      )}
                      <label style={{ ...styles.label, textAlign: "left" as const }}>Código PIX copia e cola</label>
                      <textarea style={styles.code} readOnly value={CHECKOUT.pixCopyPaste || "Informe o código PIX em CHECKOUT.pixCopyPaste"} />
                    </>
                  ) : (
                    <div style={{ padding: 18, borderRadius: 14, background: "#f3f3f3", color: "#777", fontSize: 13 }}>
                      Valor do PIX definido como R$ 0,00.
                    </div>
                  )}
                </div>
              </div>
            )}
            <div style={styles.total}>
              <span style={{ fontWeight: 700, color: "#666" }}>Total da inscrição</span>
              <strong style={{ fontSize: 27 }}>{money(CHECKOUT.price)}</strong>
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
          Valores, banner, textos, PIX e configurações ficam concentrados no objeto CHECKOUT deste arquivo para facilitar a edição.
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: "@keyframes checkoutBanner{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}@media(max-width:900px){.checkout-card{grid-template-columns:1fr!important}.checkout-card>div{min-width:0!important}}@media(max-width:760px){.checkout-card>div>div[style*='grid-template-columns: 1fr 1fr']{grid-template-columns:1fr!important}}@media(max-width:600px){.checkout-card{border-radius:18px!important}.methodRow{grid-template-columns:1fr 1fr!important}}"}} />
    </main>
  );
}
