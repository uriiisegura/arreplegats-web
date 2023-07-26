const styles = {
    historyOutcome: {
        width: 20,
        borderRadius: 5,
        backgroundColor: '#fff',
        color: '#000'
    },
    historyContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        margin: 10,
    }
}

function CastellResultat({ stats, selectedCastell, selectedResult, restartAssaig }) {
    const castellStats = stats[selectedCastell.castell]

    const history = castellStats?.stats
        .map(outcome => outcome.split(' ').map(w => w.charAt(0)).join(''))  // Només inicials
        .slice(-5)  // Només les últimes 5
        .map((outcome, i) => <span key={i} style={styles.historyOutcome} className={outcome.toLowerCase()}>{outcome}</span>)

    // Render
    return (
        <div className="game-canvas-center">
            <h1>{selectedCastell.castell}</h1>
            {
                selectedResult ? <>
                    <h5 className={selectedResult.toLowerCase()}>
                        {selectedResult}
                    </h5>

                    <div style={styles.historyContainer}>
                        {history}
                    </div>
                    <button className="back-btn" onClick={restartAssaig}>CONTINUA</button>
                </> : <>
                    <div className="loading game-loading"></div>
                </>
            }
        </div>
    )
}

export default CastellResultat;