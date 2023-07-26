function CastellResultat({ selectedCastell, selectedResult, restartAssaig }) {
    // Render
    return (
        <div className="game-canvas-center">
            <h1>{selectedCastell.castell}</h1>
            {
                selectedResult ? <>
                    <h5 className={selectedResult.toLowerCase()}>{selectedResult}</h5>
                    <button className="back-btn" onClick={restartAssaig}>CONTINUA</button>
                </> : <>
                    <div className="loading game-loading"></div>
                </>
            }
        </div>
    )
}

export default CastellResultat;