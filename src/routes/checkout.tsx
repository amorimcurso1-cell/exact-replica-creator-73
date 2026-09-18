import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useEffect, useMemo, useState } from "react";

const pixBrandLogo = "https://upload.wikimedia.org/wikipedia/commons/5/50/Pix_%28Brazil%29_logo.svg";

const CHECKOUT = {
  productName: "Mentoria Projeto dos 100K",
  price: 59.98,
  paymentLink: "https://pay.kiwify.com.br/i5C8OzN",

  // Preencha estes campos quando enviar o QR Code e o código PIX.
  pixQrImage: "https://i.postimg.cc/T2q5KT2r/Screenshot-2.png",
  pixCopyPaste: "00020101021226900014br.gov.bcb.pix2568qrcode.somossimpay.com.br/v2/qr/cob/f9603aef8dff4823ba5c60797ef7e46d5204000053039865802BR5918ORBE SERVICES LTDA6009SAO PAULO62070503***6304A9ED",

  // Textos do banner: totalmente editáveis aqui.
  bannerTexts: ["O NOVO JOGO", "0 AO 100K FACIL", "APROVEITA A OPORTUNIDADE"],
};

const installmentOptions = Array.from({ length: 12 }, (_, index) => index + 1);
const pixOptions = [15, 20, 25, 30];

const PIX_BY_AMOUNT: Record<number, { code: string; qr: string }> = {
  15: {
    code: "00020101021226900014br.gov.bcb.pix2568qrcode.somossimpay.com.br/v2/qr/cob/cf26cc1894794e849f23ba43a0d9fda35204000053039865802BR5918ORBE SERVICES LTDA6009SAO PAULO62070503***6304EE5D",
    qr: "https://i.postimg.cc/mr1tBHgt/Screenshot-3.png",
  },
  20: {
    code: "",
    qr: "",
  },
  25: {
    code: "00020101021226900014br.gov.bcb.pix2568qrcode.somossimpay.com.br/v2/qr/cob/c3faedb860004b148815353ce8d801bd5204000053039865802BR5918ORBE SERVICES LTDA6009SAO PAULO62070503***6304EEEB",
    qr: "https://i.postimg.cc/xTWdgdRS/Screenshot-1.png",
  },
  30: {
    code: "",
    qr: "",
  },
};

type PaymentMode = "card" | "pix" | "split";

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
  installmentOffer: {
    margin: "22px auto 0",
    width: "min(100%,330px)",
    padding: "18px 20px 16px",
    borderRadius: 20,
    border: "1px solid rgba(255,255,255,.12)",
    background: "linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02))",
    boxShadow: "0 14px 34px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.05)",
    textAlign: "left" as const,
  } as React.CSSProperties,
  installmentEyebrow: {
    color: "rgba(255,255,255,.55)",
    fontSize: 10,
    fontWeight: 900,
    letterSpacing: ".16em",
    marginBottom: 7,
  } as React.CSSProperties,
  installmentMain: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
  } as React.CSSProperties,
  installmentCount: {
    fontSize: "clamp(34px,5vw,48px)",
    lineHeight: 1,
    fontWeight: 900,
    color: "#fff",
  } as React.CSSProperties,
  installmentCopy: {
    display: "flex",
    alignItems: "baseline",
    gap: 7,
    color: "rgba(255,255,255,.65)",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: ".08em",
  } as React.CSSProperties,
  installmentSub: {
    marginTop: 9,
    color: "rgba(255,255,255,.68)",
    fontSize: 13,
  } as React.CSSProperties,
  timerBox: {
    margin: "0 auto 22px",
    padding: "16px 18px",
    borderRadius: 18,
    border: "1px solid rgba(249,79,23,.32)",
    background: "linear-gradient(180deg,rgba(249,79,23,.12),rgba(249,79,23,.04))",
    width: "min(100%,290px)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.04),0 12px 30px rgba(0,0,0,.18)",
  } as React.CSSProperties,
  timerLabel: { color: "rgba(255,255,255,.62)", fontSize: 11, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".12em", fontWeight: 800 } as React.CSSProperties,
  timerDisplay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
    fontVariantNumeric: "tabular-nums",
  } as React.CSSProperties,
  timerDigit: {
    display: "inline-grid",
    placeItems: "center",
    minWidth: 76,
    height: 64,
    borderRadius: 12,
    background: "linear-gradient(180deg,#151515,#090909)",
    border: "1px solid rgba(255,255,255,.1)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.04),0 8px 22px rgba(0,0,0,.18)",
    fontSize: "clamp(34px,5vw,50px)",
    fontWeight: 900,
    letterSpacing: ".04em",
  } as React.CSSProperties,
  timerColon: {
    fontSize: 34,
    fontWeight: 900,
    color: "#f94f17",
  } as React.CSSProperties,
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
  const [splitAmount, setSplitAmount] = useState(15);
  const [installments, setInstallments] = useState(12);
  const [secondsLeft, setSecondsLeft] = useState(59 * 60 + 59);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => (current > 0 ? current - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const pixAmount = Math.min(30, Math.max(15, splitAmount));

  const cardAmount = useMemo(
    () => Math.max(0, CHECKOUT.price - pixAmount),
    [pixAmount],
  );

  const cardPerInstallment = installments
    ? cardAmount / installments
    : cardAmount;

  const selectedPix = PIX_BY_AMOUNT[pixAmount] ?? PIX_BY_AMOUNT[15];


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
            <div style={styles.timerBox}>
              <div style={styles.timerLabel}>Tempo reservado para concluir o pagamento</div>
              <div style={styles.timerDisplay}>
                <span style={styles.timerDigit}>{minutes}</span>
                <span style={styles.timerColon}>:</span>
                <span style={styles.timerDigit}>{seconds}</span>
              </div>
            </div>

            <h1 style={styles.title}>
              Garanta seu acesso à <span style={styles.orange}>mentoria</span>
            </h1>

            <div style={styles.installmentOffer}>
              <div style={styles.installmentEyebrow}>OFERTA ESPECIAL</div>
              <div style={styles.installmentMain}>
                <span style={styles.installmentCount}>12X</span>
                <span style={styles.installmentCopy}>
                  <span>DE</span>
                  <strong style={{ color: "#f94f17", fontSize: "clamp(28px,4vw,42px)", lineHeight: 1 }}>R$ 5,00</strong>
                </span>
              </div>
              <div style={styles.installmentSub}>Ou R$ 59,98 à vista</div>
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
                    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                      <img
                        src={pixBrandLogo}
                        alt="Pix"
                        style={{ display: "block", width: 86, height: 30, objectFit: "contain" }}
                      />
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

              <label style={styles.label}>Escolha o valor fixo no PIX</label>

              <div
                className="pix-options"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,minmax(0,1fr))",
                  gap: 10,
                  width: "100%",
                  maxWidth: 520,
                  margin: "14px auto 10px",
                  justifyContent: "center",
                }}
              >
                {pixOptions.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSplitAmount(value)}
                    style={{
                      ...styles.method,
                      ...(splitAmount === value ? styles.activeMethod : {}),
                      width: "100%",
                      minWidth: 0,
                      padding: "13px 6px",
                      whiteSpace: "nowrap",
                      overflow: "visible",
                      fontSize: 14,
                    }}
                    aria-pressed={splitAmount === value}
                  >
                    R$ {value}
                  </button>
                ))}
              </div>

              <div style={{ marginTop: 10, fontSize: 12, color: "#777", textAlign: "center" }}>
                Opções disponíveis: R$ 15,00 • R$ 20,00 • R$ 25,00 • R$ 30,00.
              </div>

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
                <div style={styles.panelTitle}>Pagamento com cartão</div>
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
                <div style={{ ...styles.panelTitle, display: "flex", justifyContent: "center", marginBottom: 12 }}>
                  <img src={pixBrandLogo} alt="Pix" style={{ width: 96, height: 34, objectFit: "contain" }} />
                </div>
                <label style={{ ...styles.label, textAlign: "left" as const }}>Código PIX copia e cola</label>
                <textarea
                  style={styles.code}
                  readOnly
                  value={CHECKOUT.pixCopyPaste}
                />
                {CHECKOUT.pixQrImage ? (
                  <img src={CHECKOUT.pixQrImage} alt="QR Code PIX" style={styles.qr} />
                ) : (
                  <div style={styles.qrPlaceholder}>QR CODE PIX<br />aguardando o arquivo</div>
                )}
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
                      <label style={{ ...styles.label, textAlign: "left" as const }}>Código PIX copia e cola</label>
                      <textarea style={styles.code} readOnly value={selectedPix.code || "Código PIX deste valor ainda não configurado"} />
                      {selectedPix.qr ? (
                        <img src={selectedPix.qr} alt={"QR Code PIX para R$ " + pixAmount} style={styles.qr} />
                      ) : (
                        <div style={styles.qrPlaceholder}>QR CODE PIX<br />aguardando o arquivo</div>
                      )}
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
