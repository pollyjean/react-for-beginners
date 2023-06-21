import { useState, useEffect } from "react";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [dollars, setDollars] = useState(0);
  const [selected, setSelected] = useState(0);
  const selectForm = document.querySelector("select");
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setDollars(value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setSelected(selectForm.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>코인 변환기 {loading ? "" : `(코인 종류 ${coins.length}개)`}</h1>
      {loading ? (
        <strong>loading...</strong>
      ) : (
        <>
          <form onSubmit={onSubmit}>
            <select>
              {coins.map((item) => (
                <option key={item.id} value={item.quotes.USD.price}>
                  [{item.symbol}]{item.name} : {item.quotes.USD.price} USD
                </option>
              ))}
            </select>
            <hr />
            <label htmlFor="dollar">Dollar </label>
            <input id="dollar" type="text" value={dollars} onChange={onChange} maxlength="20" />
            <button type="submit">Exchange to Coin</button>
          </form>
          <p>{dollars === 0 ? "" : `$${dollars / selected} USD`}</p>
        </>
      )}
    </div>
  );
};

export default App;
