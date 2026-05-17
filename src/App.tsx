import { useState } from 'react'
import './App.css'

const parseNumber = (value: string) => {
  return Number(value.replace(',', '.'))
}

function App() {
  const [entryPrice, setEntryPrice] = useState('')
  const [exitPrice, setExitPrice] = useState('')
  const [positionSize, setPositionSize] = useState('')
  const [leverage, setLeverage] = useState('1')
  const [feePercent, setFeePercent] = useState('0.1')
  const [accountBalance, setAccountBalance] = useState('1000')
  const [tradeType, setTradeType] = useState<'long' | 'short'>('long')

  const entry = parseNumber(entryPrice)
  const exit = parseNumber(exitPrice)
  const size = parseNumber(positionSize)
  const lev = parseNumber(leverage)
  const fee = parseNumber(feePercent)
  const balance = parseNumber(accountBalance)

  const isValid =
    entry > 0 &&
    exit > 0 &&
    size > 0 &&
    lev > 0 &&
    fee >= 0 &&
    balance >= 0

  const priceDifference = tradeType === 'long' ? exit - entry : entry - exit

  const totalPositionValue = isValid ? size * lev : 0
  const grossProfitLoss = isValid
    ? (priceDifference / entry) * totalPositionValue
    : 0
  const totalFees = isValid ? totalPositionValue * (fee / 100) * 2 : 0
  const netProfitLoss = grossProfitLoss - totalFees
  const newBalance = balance + netProfitLoss
  const roi = isValid ? (netProfitLoss / size) * 100 : 0
  const priceMovePercent = isValid ? (priceDifference / entry) * 100 : 0

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Free Online Tool</p>
        <h1>Trading Profit Calculator</h1>
        <p>
          Calculate your trading profit, loss, leverage impact, fees, position value,
          return on investment, and new account balance.
        </p>
      </section>

      <section className="calculator">
        <div className="form-card">
          <h2>Trade Details</h2>

          <label>
            Trade Type
            <select
              value={tradeType}
              onChange={(e) => setTradeType(e.target.value as 'long' | 'short')}
            >
              <option value="long">Long / Buy</option>
              <option value="short">Short / Sell</option>
            </select>
            <small>
              Choose Long if you expect the price to go up. Choose Short if you expect
              the price to go down.
            </small>
          </label>

          <label>
            Entry Price
            <input
              type="text"
              inputMode="decimal"
              value={entryPrice}
              onChange={(e) => setEntryPrice(e.target.value)}
              placeholder="Example: 50000"
            />
            <small>The price where you open the trade.</small>
          </label>

          <label>
            Exit Price
            <input
              type="text"
              inputMode="decimal"
              value={exitPrice}
              onChange={(e) => setExitPrice(e.target.value)}
              placeholder="Example: 52000"
            />
            <small>The price where you close the trade.</small>
          </label>

          <label>
            Position Size
            <input
              type="text"
              inputMode="decimal"
              value={positionSize}
              onChange={(e) => setPositionSize(e.target.value)}
              placeholder="Example: 100"
            />
            <small>
              The amount of your own money used for the trade, before leverage.
            </small>
          </label>

          <label>
            Leverage
            <input
              type="text"
              inputMode="decimal"
              value={leverage}
              onChange={(e) => setLeverage(e.target.value)}
              placeholder="Example: 10"
            />
            <small>
              Leverage multiplies your position size. Higher leverage increases both
              profit and risk.
            </small>
          </label>

          <label>
            Trading Fee %
            <input
              type="text"
              inputMode="decimal"
              value={feePercent}
              onChange={(e) => setFeePercent(e.target.value)}
              placeholder="Example: 0.1"
            />
            <small>
              Estimated exchange or broker fee. The calculator applies the fee for
              both opening and closing the trade.
            </small>
          </label>

          <label>
            Account Balance
            <input
              type="text"
              inputMode="decimal"
              value={accountBalance}
              onChange={(e) => setAccountBalance(e.target.value)}
              placeholder="Example: 1000"
            />
            <small>Your account balance before the trade.</small>
          </label>
        </div>

        <div className="result-card">
          <h2>Results</h2>

          {!isValid ? (
            <p className="empty-result">
              Enter your trade details to calculate the result.
            </p>
          ) : (
            <div className="results">
              <div>
                <span>
                  Total Position Value
                  <small>Position size multiplied by leverage.</small>
                </span>
                <strong>${totalPositionValue.toFixed(2)}</strong>
              </div>

              <div>
                <span>
                  Price Move
                  <small>The price change based on your trade direction.</small>
                </span>
                <strong className={priceMovePercent >= 0 ? 'positive' : 'negative'}>
                  {priceMovePercent.toFixed(2)}%
                </strong>
              </div>

              <div>
                <span>
                  Gross Profit / Loss
                  <small>The trade result before fees are removed.</small>
                </span>
                <strong className={grossProfitLoss >= 0 ? 'positive' : 'negative'}>
                  ${grossProfitLoss.toFixed(2)}
                </strong>
              </div>

              <div>
                <span>
                  Total Fees
                  <small>Estimated fee for opening and closing the trade.</small>
                </span>
                <strong>${totalFees.toFixed(2)}</strong>
              </div>

              <div>
                <span>
                  Net Profit / Loss
                  <small>Your estimated final result after fees.</small>
                </span>
                <strong className={netProfitLoss >= 0 ? 'positive' : 'negative'}>
                  ${netProfitLoss.toFixed(2)}
                </strong>
              </div>

              <div>
                <span>
                  ROI
                  <small>Return compared to your own position size.</small>
                </span>
                <strong className={roi >= 0 ? 'positive' : 'negative'}>
                  {roi.toFixed(2)}%
                </strong>
              </div>

              <div>
                <span>
                  New Account Balance
                  <small>Your balance after the estimated trade result.</small>
                </span>
                <strong>${newBalance.toFixed(2)}</strong>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="info-section">
        <h2>How the Trading Profit Calculator Works</h2>

        <p>
          This calculator estimates the result of a trade based on your entry price,
          exit price, position size, leverage, trading fees, and starting account
          balance.
        </p>

        <div className="info-grid">
          <article>
            <h3>Profit and Loss</h3>
            <p>
              For a long trade, profit is made when the exit price is higher than the
              entry price. For a short trade, profit is made when the exit price is
              lower than the entry price.
            </p>
          </article>

          <article>
            <h3>Leverage</h3>
            <p>
              Leverage increases your market exposure. For example, a $100 position
              with 10x leverage gives you a total position value of $1,000.
            </p>
          </article>

          <article>
            <h3>Fees</h3>
            <p>
              Trading fees can reduce your final result. This calculator estimates
              fees for both opening and closing the trade.
            </p>
          </article>

          <article>
            <h3>New Balance</h3>
            <p>
              The new account balance shows your starting balance plus or minus the
              net profit or loss after fees.
            </p>
          </article>
        </div>

        <section className="seo-section">
          <h2>Free Trading Profit Calculator for Crypto, Forex and Stocks</h2>

          <p>
            This free trading profit calculator can be used to estimate potential profit
            or loss before entering a trade. It works for crypto trading, forex trading,
            stock trading, CFD trading, and other markets where you know your entry price,
            exit price, position size, leverage, and trading fee.
          </p>

          <p>
            The calculator is designed to be simple for beginners. Instead of using
            complicated trading formulas manually, you can enter your trade details and
            instantly see your estimated gross profit or loss, total fees, net result,
            return on investment, and account balance after the trade.
          </p>
        </section>

        <section className="formula-section">
          <h2>Formula Used</h2>

          <ul>
            <li>Position Value = Position Size × Leverage</li>
            <li>Price Move % = Price Difference / Entry Price × 100</li>
            <li>Gross Profit / Loss = Position Value × Price Move %</li>
            <li>Fees = Position Value × Fee % × 2</li>
            <li>Net Profit / Loss = Gross Profit / Loss - Fees</li>
            <li>New Balance = Account Balance + Net Profit / Loss</li>
          </ul>
        </section>

        <p className="disclaimer">
          This tool is for educational purposes only. It does not provide financial
          advice, and real trading results may differ because of spreads, slippage,
          funding fees, liquidation risk, and market conditions.
        </p>
      </section>
    </main>
  )
}

export default App