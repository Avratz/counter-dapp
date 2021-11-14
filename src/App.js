import React from 'react';	
import {useWeb3, useContract} from './hooks/web3';

import CounterAbi from './contracts/Counter.json'

function App() {
  
  const provider = "ws://127.0.0.1:8545";
  const defaultAccount = "0xC17724894f90478697E5cc108A361FE0eC6715c6";
  const contractAddress = "0xC724FFd9EFEbF7ecc6c03f25fED18A4d4A365fF7";

  const web3 = useWeb3(provider, defaultAccount);
  const contract = useContract(web3, CounterAbi, contractAddress);

  React.useEffect(() => {
    const getContract = async () => {
      const counter = await contract.methods.counter().call();
      setCounter(counter);
    };
    getContract();
  }, []);

  const [counter, setCounter] = React.useState(0);
  const handleIncrement = async () => {
    await contract.methods.increment().send({from: defaultAccount}); 
    const counter = await contract.methods.counter().call();
    setCounter(counter);
  };
  const handleDecrement = async () => {
    await contract.methods.decrement().send({from: defaultAccount}); 
    const counter = await contract.methods.counter().call();
    setCounter(counter);
  };

  return (
    <div className="App">
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      <span>Total: {counter}</span>
    </div>
  );
}

export default App;
