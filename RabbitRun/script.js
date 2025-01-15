// Smart Contract Details
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_vrfCoordinator",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "_keyHash",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "_subscriptionId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_rakeWallet",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_houseWallet",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "have",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "want",
				"type": "address"
			}
		],
		"name": "OnlyCoordinatorCanFulfill",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "have",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "coordinator",
				"type": "address"
			}
		],
		"name": "OnlyOwnerOrCoordinator",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ZeroAddress",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "rabbitNumber",
				"type": "uint8"
			}
		],
		"name": "BetPlaced",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "BetRefunded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "vrfCoordinator",
				"type": "address"
			}
		],
		"name": "CoordinatorSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "rakePercentage",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "payoutMultiplier",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "maxBet",
				"type": "uint256"
			}
		],
		"name": "ParametersUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "winningRabbit",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "won",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "payout",
				"type": "uint256"
			}
		],
		"name": "RaceResult",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "requestId",
				"type": "uint256"
			}
		],
		"name": "RaceStarted",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "COORDINATOR",
		"outputs": [
			{
				"internalType": "contract IVRFCoordinatorV2Plus",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MAX_BET",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "acceptOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "bets",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "rabbitNumber",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "resolved",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRaceDetails",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "houseWallet",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "keyHash",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastRequestId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "payoutMultiplier",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "rabbitNumber",
				"type": "uint8"
			}
		],
		"name": "placeBet",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "raceInProgress",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "rakePercentage",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "rakeWallet",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "requestId",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "randomWords",
				"type": "uint256[]"
			}
		],
		"name": "rawFulfillRandomWords",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "refundBet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "s_vrfCoordinator",
		"outputs": [
			{
				"internalType": "contract IVRFCoordinatorV2Plus",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_vrfCoordinator",
				"type": "address"
			}
		],
		"name": "setCoordinator",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startRace",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "subscriptionId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_rakePercentage",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_payoutMultiplier",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_maxBet",
				"type": "uint256"
			}
		],
		"name": "updateParameters",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "winningRabbit",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const contractAddress = '0xe296694bdae953676b3a34be0e0aaf1e7bb7ffc9';

let web3;
let rabbitRunContract;
let userAccount;
const numberOfRabbits = 10;

// Connect Wallet and Initialize Contract
async function connectWallet() {
    try {
        if (typeof Web3 !== 'undefined') {
            web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            userAccount = accounts[0];
            document.getElementById('wallet-status').textContent = `Wallet: ${userAccount}`;
            const balanceInWei = await web3.eth.getBalance(userAccount);
            const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether');
            document.getElementById('user-balance').textContent = `${parseFloat(balanceInEth).toFixed(4)} ETH`;

            rabbitRunContract = new web3.eth.Contract(contractABI, contractAddress);
            setupEventListeners();
        } else {
            alert('Please install MetaMask!');
        }
    } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('Failed to connect wallet. Check console for details.');
    }
}

// Setup Event Listeners for the Contract
function setupEventListeners() {
    if (!rabbitRunContract) return console.error('Contract not initialized.');
    rabbitRunContract.events.BetPlaced({ fromBlock: 'latest' })
        .on('data', (event) => {
            const { user, amount, rabbitNumber } = event.returnValues;
            console.log('BetPlaced event:', event);
            if (user.toLowerCase() === userAccount.toLowerCase()) {
                document.getElementById('active-bet').textContent = `Bet: ${web3.utils.fromWei(amount, 'ether')} ETH on Rabbit ${rabbitNumber}`;
            }
        });

    rabbitRunContract.events.RaceStarted({ fromBlock: 'latest' })
        .on('data', () => {
            console.log('RaceStarted event triggered');
            document.getElementById('active-bet').textContent = 'Race in progress...';
        });
    rabbitRunContract.events.RaceResult({ fromBlock: 'latest' })
        .on('data', (event) => {
            const { winningRabbit, won } = event.returnValues;
            console.log('RaceResult event:', event);
            highlightWinningRabbit(winningRabbit);
            const message = won
                ? `🎉 You won! Rabbit ${winningRabbit} won the race!`
                : `😢 You lost. Rabbit ${winningRabbit} won the race.`;
            alert(message);
        });
}

// Generate Fixed Rabbit Lanes
function generateRaceTrack() {
    const track = document.getElementById('track');
    track.innerHTML = '';
    // Clear any existing lanes

    for (let i = 1; i <= numberOfRabbits; i++) {
        const lane = document.createElement('div');
        lane.className = 'track-lane';
        lane.id = `lane-${i}`;

        const rabbit = document.createElement('div');
        rabbit.className = 'rabbit';
        rabbit.id = `rabbit-${i}`;
        rabbit.textContent = i;
        // Add the rabbit number inside the rectangle
        rabbit.addEventListener('click', () => selectRabbit(i));

        lane.appendChild(rabbit);
        track.appendChild(lane);
    }
}

// Handle Rabbit Selection
function selectRabbit(rabbitNumber) {
    const rabbits = document.querySelectorAll('.rabbit');
    rabbits.forEach((rabbit) => rabbit.classList.remove('selected'));
    const selectedRabbit = document.getElementById(`rabbit-${rabbitNumber}`);
    if (selectedRabbit) {
        selectedRabbit.classList.add('selected');
    }

    document.getElementById('active-bet').textContent = `Selected Rabbit: ${rabbitNumber}`;
    // Enable Place Bet button only when a rabbit is selected
    const placeBetButton = document.getElementById('place-bet');
    placeBetButton.disabled = false;
    placeBetButton.setAttribute('data-selected-rabbit', rabbitNumber);
}

// Start Race
document.getElementById('start-race').addEventListener('click', async () => {
    try {
        if (!rabbitRunContract) return alert('Please connect your wallet first.');
        console.log('Starting race...');
        await rabbitRunContract.methods.startRace().send({ from: userAccount });
        alert('Race started successfully!');
    } catch (error) {
        console.error('Error starting race:', error);
        alert('Failed to start race. Check console for details.');
    }
});

// Place a Bet
async function placeBet(rabbitNumber, betAmount) {
    try {
        if (!rabbitRunContract) return alert('Please connect your wallet first.');
        console.log(`Placing bet on Rabbit ${rabbitNumber} with ${betAmount} ETH...`);
        await rabbitRunContract.methods.placeBet(rabbitNumber)
            .send({ from: userAccount, value: web3.utils.toWei(betAmount, 'ether') });
        alert(`Bet placed on Rabbit ${rabbitNumber} successfully!`);
        // Enable Start Race button after a bet is placed
        document.getElementById('start-race').disabled = false;
    } catch (error) {
        console.error('Error placing bet:', error);
        alert('Failed to place bet. Check console for details.');
    }
}

// Event listener for Place Bet button
document.getElementById('place-bet').addEventListener('click', async () => {
    const rabbitNumber = document.getElementById('place-bet').getAttribute('data-selected-rabbit');
    const betAmount = document.getElementById('bet-amount').value;
    await placeBet(rabbitNumber, betAmount);
});

// Initialize the Track on Page Load
window.onload = () => {
    generateRaceTrack();
    // Always display 10 rectangles for rabbits
};

// Add Wallet Connection Listener
document.getElementById('connect-wallet').addEventListener('click', connectWallet);