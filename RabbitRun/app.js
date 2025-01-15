let web3;
let contract;
let userAccount;

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            userAccount = accounts[0];
            document.querySelector('.wallet-status').innerText = `Wallet: ${userAccount}`;

            contract = new web3.eth.Contract(contractABI, contractAddress);
            console.log("Contract connected:", contract);
        } catch (error) {
            console.error("Failed to connect wallet:", error);
        }
    } else {
        alert("Please install MetaMask!");
    }
});

// Place Bet
document.getElementById('place-bet').addEventListener('click', async () => {
    const selectedRabbit = document.querySelector('.rabbit-btn.selected');
    if (!selectedRabbit) {
        alert("Please select a rabbit!");
        return;
    }
    const rabbitNumber = selectedRabbit.dataset.rabbit;
    const betAmount = web3.utils.toWei(document.getElementById('bet-amount').value, 'ether');
    try {
        await contract.methods.placeBet(rabbitNumber).send({ from: userAccount, value: betAmount });
        alert("Bet placed successfully!");
    } catch (error) {
        console.error("Error placing bet:", error);
        alert("Transaction failed. Check console for details.");
    }
});

// Rabbit Selection
document.querySelectorAll('.rabbit-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.rabbit-btn').forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    });
});
