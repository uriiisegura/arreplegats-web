function linearReg(point1, point2, x) {
    // Calculate the slope
    let slope = (point2[1] - point1[1]) / (point2[0] - point1[0]);

    // Calculate the y-intercept
    let intercept = point1[1] - slope * point1[0];

    // Calculate and return the y value
    return slope * x + intercept;
}

function AmountCastellers(puntuacio, ngent) {
    const L = [40*ngent - 1243, 0]
    const H = [72*ngent - 1416, ngent*0.1]

    const res = linearReg(L, H, puntuacio) + 1
    const rounded_res = Math.round(res)

    return rounded_res   
}

export default AmountCastellers;