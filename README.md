# Trading Profit Calculator

A simple and beginner-friendly trading calculator built with React, TypeScript, Vite, and plain CSS.

The tool helps users estimate potential profit or loss before opening a trade by calculating leverage impact, trading fees, position value, ROI, and the new account balance after the trade.

## Live Demo

https://trading-profit-calculator.pages.dev/

## Features

- Calculate profit and loss for long and short trades
- Supports leverage calculations
- Estimates trading fees for opening and closing a trade
- Shows total position value
- Shows gross profit or loss
- Shows net profit or loss after fees
- Shows ROI
- Shows new account balance after the trade
- Accepts both decimal point and decimal comma, for example `0.1` and `0,1`
- Responsive design for desktop and mobile
- SEO optimized with meta tags, sitemap, robots.txt, and structured data

## Built With

- React
- TypeScript
- Vite
- CSS
- Cloudflare Pages

## How It Works

The calculator uses the following basic formulas:

```text
Position Value = Position Size × Leverage

Price Move % = Price Difference / Entry Price × 100

Gross Profit / Loss = Position Value × Price Move %

Fees = Position Value × Fee % × 2

Net Profit / Loss = Gross Profit / Loss - Fees

New Balance = Account Balance + Net Profit / Loss
