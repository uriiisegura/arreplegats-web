import { useState } from "react";

function InvitacioSopar2023() {
    const [copiedIBAN, setCopiedIBAN] = useState(false);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);

        // IBAN
        setCopiedIBAN(true);
        setTimeout(() => setCopiedIBAN(false), 1000);
    };

    return (
        <div
            style={{
                margin: 10,
            }}
        >

            <div
                style={{

                }}
            >
                <img
                    src={'./images/sopar2023.jpg'}
                    style={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover',
                    }}
                />
            </div>

            <h3 style={{ marginTop: 10, marginBottom: 10 }}>Se t'ha convidat a la Festa del Novato 2023!</h3>
            <h4>Dijous 26 d'octubre @ 23.59h - <a href="https://maps.app.goo.gl/9ZipPaR8rbkERsD37">Sala Salamandra</a> (L1 - Av. Carrilet)</h4>

            <div
                style={{
                }}
            >
                <div
                    style={{
                        flex: 1,
                    }}
                >
                    <p>Per primera vegada, obrim la nostra festa als <strong>joves de colles convencionals</strong>. Vine i coneix l'experiència de primera mà!</p>
                </div>
                <div
                    style={{
                        display: 'flex',
                    }}
                >
                    <p>L'entrada val 12€ si es compra a taquilla. Però si vens de part d'Arreplegats...</p>
                </div>
                <div
                    style={{
                        width: '90%',
                        textAlign: 'right',
                    }}
                >
                    <h3>NOMÉS 8€!</h3>
                </div>

                <p>Inclou <strong>1 cubata o 2 birres/refrescs</strong>!</p>

                <h3>
                    I com pago?
                </h3>

                <div>
                    <p>Molt fàcil! Envia 8€ a l'IBAN de la colla.</p>

                    <input
                        type="text"
                        readOnly
                        value={'ES64 3025 0011 7614 0012 8727'}
                        style={{
                            width: 'calc(100% - 10px)',
                            marginLeft: 10,
                            marginBottom: 20,
                            backgroundColor: '#eee',
                        }}
                    />

                    <div
                        onClick={() => copyToClipboard('ES64 3025 0011 7614 0012 8727')}
                        style={{
                            width: 'calc(100% - 10px)',   // Considering marginLeft
                            marginLeft: 10,
                            height: 40,
                            background: '#007BFF',       // Button color
                            color: 'white',              // Text color
                            border: 'none',
                            borderRadius: 5,             // Rounded corners
                            display: 'flex',             // Flexbox for centering
                            justifyContent: 'center',    // Center horizontally
                            alignItems: 'center',        // Center vertically
                            cursor: 'pointer',           // Hand cursor on hover
                            transition: 'background 0.3s', // Transition for hover effect
                            padding: '5px 15px',         // Padding to make button look nicer
                            boxSizing: 'border-box',    // Include padding in width and height calculations
                            userSelect: 'none',          // Prevent selection of text on double click
                            marginBottom: 10,
                        }}
                        onPointerOver={(e) => e.currentTarget.style.background = '#0056b3'}   // Darker color on hover
                        onPointerOut={(e) => e.currentTarget.style.background = '#007BFF'}    // Original color on mouse out
                        onPointerDown={(e) => e.currentTarget.style.background = '#004085'}   // Even darker on click
                        onPointerUp={(e) => e.currentTarget.style.background = '#0056b3'}     // Back to hover color on mouse up
                    >
                        {
                            copiedIBAN ? 'Copiat!' :
                            "Copia l'IBAN"
                        }
                    </div>

                    <p>I posa el següent concepte!</p>

                    <input
                        type="text"
                        readOnly
                        value={'SALAMANDRA - {Nom} {Cognom}'}
                        style={{
                            width: 'calc(100% - 10px)',
                            marginLeft: 10,
                            marginBottom: 20,
                            backgroundColor: '#eee',
                        }}
                    />
                </div>

                <div
                    style={{
                        width: '100%',
                        marginTop: 10,
                        marginBottom: 10,
                    }}
                >
                    <h3>T'hi esperem!!</h3>
                </div>

                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95809.51574478608!2d1.991360043359369!3d41.37305560000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a498de4248edef%3A0xe1164c0e59560f0f!2sSalamandra!5e0!3m2!1sca!2ses!4v1697710120904!5m2!1sca!2ses"
                        width="300"
                        height="200"
                        style={{
                            border: 0,
                        }}
                        allowFullScreen={false}
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    )
}

export default InvitacioSopar2023;