class LinearRegression {

    constructor() {
        this.m = 0.1
        this.b = 0
        this.lr = 0.0001
        this.error = Infinity
    }

    fit(features, labels) {

        var b_grad = 0;
        var m_grad = 0;

        let N = features.length

        for (let i = 0; i < N; i++) {
            let x = features[i]
            let y = labels[i]

            
            let yPred = this.f(x)
            
            console.log(y, yPred)

            b_grad += -(2 / N) * (y - yPred);
            m_grad += -(2 / N) * x * (y - yPred);
        }
        this.m -= this.lr * m_grad;
        this.b -= this.lr * b_grad;

        this.computeCost()
    }

    f(x) {
        return this.m * x + this.b
    }

    predict(x) {
        console.log(x)
        return this.f(x)
    }

    computeCost() {
        this.error = 0
        let N = features.length

        for (let i = 0; i < N; i++) {
            let x = features[i]
            let y = labels[i]

            let yPred = this.f(x)
            let error = Math.pow(y - yPred, 2)

            this.error += error
        }

        this.error = this.error / N
    }

}