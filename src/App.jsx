import { useState, useEffect } from "react";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [dollars, setDollars] = useState(0);
  const [selected, setSelected] = useState(0);
  const [coinSymbol, setCoinSymbol] = useState("");
  const selectForm = document.querySelector("select");
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setDollars(value);
  };
  const onSelect = () => {
    setSelected("");
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const option = selectForm.querySelector("option:checked");
    setSelected(selectForm.value);
    setCoinSymbol(option.getAttribute("data-symbol"));
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error : ", error);
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
            <select onChange={onSelect}>
              {coins.map((item) => (
                <option key={item.id} value={item.quotes.USD.price} data-symbol={item.symbol}>
                  [{item.symbol}]{item.name} : {item.quotes.USD.price} USD
                </option>
              ))}
            </select>
            <hr />
            <label htmlFor="dollar">Dollar </label>
            <input id="dollar" type="text" value={dollars} onChange={onChange} maxLength="20" />
            <button type="submit">Exchange to Coin</button>
          </form>
          <p>{selected ? (!dollars ? "" : `${dollars / selected} ${coinSymbol}`) : ""}</p>
        </>
      )}
    </div>
  );
};

export default App;
