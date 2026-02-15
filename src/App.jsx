import React from "react";

export default function App() {
    const [from, setFrom] = React.useState("SEK");
    const fetchExchange = async (amountValue, fromValue, toValue, updateTop) => {
        if (!amountValue) {
            setResult("");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/exchange?from=${fromValue}&to=${toValue}&amount=${amountValue}`
            );

            if (!response.ok) {
                setResult("");
                return;
            }

            const data = await response.text();

            if (updateTop) {
                setAmount(data);
            } else {
                setResult(data);
            }

        } catch (err) {
            setResult("");
        }
    };

    const [sekRates, setSekRates] = React.useState({ eur: "", usd: "" });

    const loadSekRates = async () => {
        try {
            const eurRes = await fetch("http://localhost:8080/exchange?from=EUR&to=SEK&amount=1");
            const usdRes = await fetch("http://localhost:8080/exchange?from=USD&to=SEK&amount=1");

            const eur = eurRes.ok ? await eurRes.text() : "";
            const usd = usdRes.ok ? await usdRes.text() : "";

            setSekRates({ eur, usd });
        } catch (e) {
            setSekRates({ eur: "", usd: "" });
        }
    };

    React.useEffect(() => {
        loadSekRates();
    }, []);
    const [to, setTo] = React.useState("EUR");
    const [amount, setAmount] = React.useState("");
    const [result, setResult] = React.useState("");

    const fetchRates = async () => {
        await fetch("http://localhost:8080/fetch", {
            method: "POST",
        });
        await loadSekRates();
    };
    return (
        <div>
            <div style={styles.page}>

                <div style={styles.topContainer}>
                    <div style={{ width: "200px" }}>
                        <img src="https://www.kleer.se/wp-content/uploads/2024/10/Kleer_logo_yellow.svg" alt="Kleer logo"></img>
                    </div>
                    <style>{`
  .kleerBtn:hover {
    filter: brightness(1.2);
  }
  .kleerBtn:active {
    filter: brightness(0.92);
  }
`}</style>
                    <button className="kleerBtn" style={styles.button} onClick={fetchRates}>
                        Hämta växelkurser
                    </button>
                </div>
                <div style={styles.card}>
                    <div style={styles.title}>
                        <h2>Valutaväxling</h2>
                    </div>

                    <div style={styles.exchangeBox}>
                        <div style={styles.row}>
                            <select
                                value={from}
                                onChange={(e) => {
                                    const newFrom = e.target.value;
                                    setFrom(newFrom);
                                    fetchExchange(amount, newFrom, to, false);
                                }}
                                style={styles.selectLarge}
                            >
                                <option value="SEK">SEK</option>
                                <option value="EUR">EUR</option>
                                <option value="USD">USD</option>
                            </select>

                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setAmount(value);
                                    fetchExchange(value, from, to, false);
                                }}
                                placeholder="Belopp"
                                style={styles.inputLarge}
                            />
                        </div>

                        <div style={styles.row}>
                            <select
                                value={to}
                                onChange={(e) => {
                                    const newTo = e.target.value;
                                    setTo(newTo);
                                    fetchExchange(amount, from, newTo, false);
                                }}
                                style={styles.selectLarge}
                            >
                                <option value="SEK">SEK</option>
                                <option value="EUR">EUR</option>
                                <option value="USD">USD</option>
                            </select>

                            <input
                                type="number"
                                value={result}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setResult(value);
                                    fetchExchange(value, to, from, true);
                                }}
                                placeholder="Resultat"
                                style={styles.inputLarge}
                            />
                        </div>
                    </div>

                    <div style={styles.sekRatesRow}>
                        <div style={styles.sekRateItem}>
                            1 EUR = {sekRates.eur ? `${sekRates.eur} SEK` : "..."}
                        </div>
                        <div style={styles.sekRateItem}>
                            1 USD = {sekRates.usd ? `${sekRates.usd} SEK` : "..."}
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
  body { margin: 0; }
`}</style>

        </div>
    );
}

const styles = {

    topContainer: {
        // boxSizing: "border-box",
        display: "flex",
        justifyContent: "space-between",
        // outline: "1px solid red",
        width: "740px",
        background: "#240238",
        // padding: "20px 40px ",

    },
    page: {
        minHeight: "100vh",
        background: "#240238",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "100px",
        alignItems: "center",
    },
    card: {
        boxSizing: "border-box",
        background: "white",

        outline: "5px solid #ffb400",
        padding: "20px 40px",
        borderRadius: "40px",
        //width: "100%",
        width: "740px",
        height: "440px",
        textAlign: "center",
    },
    button: {
        background: "#ffb400",
        color: "rgba(7, 0, 28, 1)",
        border: "none",
        padding: "14px 6px",
        width: "220px",
        height: "52px",
        fontWeight: "bold",
        fontSize: "18px",
        cursor: "pointer",
        clipPath: "polygon(0% 0%, 93% 0%, 100% 28%, 100% 100%, 7% 100%, 0% 72%)",
    },
    title: {
        color: "#240238",
        display: "flex",
        textAlign: "left",
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "20px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
        // outline: "1px solid red",
    },
    exchangeBox: {
        display: "flex",
        flexDirection: "column",
        gap: "60px",
    },

    row: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px",
    },

    selectLarge: {
        outline: "3px solid #240238",
        width: "180px",
        padding: "24px",
        borderRadius: "12px",
        border: "1px solid #ddd",
        fontSize: "18px",
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
        backgroundColor: "white",
    },

    inputLarge: {
        outline: "3px solid #240238",
        flex: 1,
        padding: "24px",
        borderRadius: "12px",
        border: "1px solid #ddd",
        fontSize: "18px",
        textAlign: "left",
    },
    sekRatesRow: {
        marginTop: "60px",
        display: "flex",
        gap: "20px",
        marginBottom: "20px",
    },

    sekRateItem: {
        borderRadius: "12px",
        textAlign: "center",
        fontSize: "16px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
        color: "#240238",
    },

};