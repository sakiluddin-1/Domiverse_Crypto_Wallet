document.addEventListener("DOMContentLoaded", function () {

  function safeAdd(id, handler) {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("click", handler);
    } else {
      console.log(`⚠️ Element not found: ${id}`);
    }
  }

  safeAdd("accountList", changeAccount);
  safeAdd("userAddress", copyAddress);
  safeAdd("transferFund", handler);
  safeAdd("header_network", getOpenNetwork);
  safeAdd("network_item", getSelectedNetwork);
  safeAdd("add_network", setNetwork);
  safeAdd("loginAccount", loginUser);
  safeAdd("accountCreate", createUser);
  safeAdd("openCreate", openCreate);
  safeAdd("sign_up", signUp);
  safeAdd("login-up", login);
  safeAdd("logout", logout);
  safeAdd("open_Transfer", openTransfer);
  safeAdd("goBack", goBack);
  safeAdd("open_Import", openImport);
  safeAdd("open_assets", openAssets);
  safeAdd("open_activity", openActivity);
  safeAdd("goHomePage", goHomePage);
  safeAdd("openAccountImport", openImportModel);
  safeAdd("close_import_account", closeImportModel);
  safeAdd("add_new_token", addToken);
  safeAdd("add_New_Account", addAccount);
});

// STATE VARIABLES
let providerURL = 'https://polygon-mainnet.g.alchemy.com/v2/J7MPyYDY00x39-3qTtvxp';

//let provider;
let privateKey;
let address;

// FUNCTIONS
function handler() {
    document.getElementById("transfer_center").style.display = "flex";

    const amount = document.getElementById("amount").value;
    const address = document.getElementById("address").value;

    const private_key = "YOUR_PRIVATE_KEY";

    const testAccount = "0x98c98681F1C20c06F6FDfb06913a8D1BF82a497b";

    const provider = new ethers.providers.JsonRpcProvider(providerURL);

    let wallet = new ethers.Wallet(privateKey, provider);

    const tx = {
        to: address,
        value: ethers.utils.parseEther(amount)
    };
    
    let a = document.getElementById("link");
    a.href = "somelink url";

    wallet.sendTransaction(tx)
        .then((txObj) => {
            console.log("txHash:", txObj.hash);

            document.getElementById("transfer_center").style.display = "none";

            const a = document.getElementById("link");

            document.getElementById("txHash").style.display = "block";
        });
};

function checkBalance(address) {
    const provider = new ethers.providers.JsonRpcProvider(providerURL);

    provider.getBalance(address)
        .then((balance) => {
            const balanceInEth = ethers.utils.formatEther(balance);
            document.getElementById("accountBalance").innerText = `Balance: ${balanceInEth} MATIC`;

            document.getElementById("userAddress").innerHTML = `Address: ${address.slice(0, 15)}...`;
        });
};

function getOpenNetwork() {
    document.getElementById("network").style.display = "block";
};

function getSelectedNetwork(e) {
    const element = document.getElementById("selected_network");
    element.innerText = e.target.innerHTML;

    if(e.target.innerHTML === "Ethereum Mainnet") {
        providerURL = "https://eth-mainnet.g.alchemy.com/v2/XLUWhLBQFi2FMnvWZ-a7i";
        document.getElementById("network").style.display = "none";
    }  else if(e.target.innerHTML === "Polygon Mainnet") {
        providerURL = 'https://polygon-mainnet.g.alchemy.com/v2/J7MPyYDY00x39-3qTtvxp';
        document.getElementById("network").style.display = "none";
    } else {
        providerURL = "https://rpc.ankr.com/eth_sepolia/fbbf181bc12833cca7559dcf78344a27d96e5b2e0362f8be58a763f56b2928c6";
        document.getElementById("network").style.display = "none";
    }

    console.log(providerURL);
};

function setNetwork() {
    document.getElementById("network").style.display = "none";
};

function loginUser() {
    document.getElementById("createAccount").style.display = "none";
    document.getElementById("LoginUser").style.display = "block";
};

function createUser() {
    document.getElementById("createAccount").style.display = "block";
    document.getElementById("LoginUser").style.display = "none";
};

function openCreate() {
    document.getElementById("createAccount").style.display = "none";
    document.getElementById("create_popUp").style.display = "block";
};

function signUp() {
    const name = document.getElementById("sign_up_name").value;
    const email = document.getElementById("sign_up_email").value;
    const password = document.getElementById("sign_up_password").value;
    const passwordConfirm = document.getElementById("sign_up_passwordConfirm").value;

    document.getElementById("field").style.display = "none";
    document.getElementById("center").style.display = "block";

    const wallet = ethers.Wallet.createRandom();

    if(wallet.address) {
        console.log(wallet);

        const url = 'http://localhost:3000/api/v1/user/signup';

        const data = {
            name: name,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm,
            address: wallet.address,
            private_key: wallet.privateKey,
            mnemonic: wallet.mnemonic.phrase,
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((response) => response.json()).then((result) => {
            console.log(result);

            document.getElementById("createdAddress").innerHTML = wallet.address;
            document.getElementById("createdPrivateKey").innerHTML = wallet.privateKey;
            document.getElementById("createdMnemonic").innerHTML = wallet.mnemonic.phrase;
            document.getElementById("center").style.display = "none";
            document.getElementById("accountData").style.display = "block";
            document.getElementById("sign_up").style.display = "none";

            const userWallet = {
                address: wallet.address,
                privateKey: wallet.privateKey,
                mnemonic: wallet.mnemonic.phrase,
            };

            const jsonObj = JSON.stringify(userWallet);

            localStorage.setItem('userWallet', jsonObj);

            document.getElementById("goHomePage").style.display = "block";
            window.location.reload();
        }).catch((error) => {
            console.error('Error:', error);
        });
    }
};

function login() {
    document.getElementById("login_form").style.display = "none";
    document.getElementById("center").style.display = "block";

    const email = document.getElementById("login_email").value;
    const password = document.getElementById("login_password").value;

    const url = 'http://localhost:3000/api/v1/user/login';

    const data = {
        email: email,
        password: password,
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((response) => response.json()).then((result) => {
        console.log(result);
        const userWallet = {
            address: result.data.user.address,
            privateKey: result.data.user.private_key,
            mnemonic: result.data.user.mnemonic,
        };

        const jsonObj = JSON.stringify(userWallet);
        localStorage.setItem('userWallet', jsonObj);
        window.location.reload();
    }).catch((error) => {
        console.error('Error:', error);
    });
};

function logout() {
    localStorage.removeItem('userWallet');
    window.location.reload();
};

function openTransfer() {
    document.getElementById("transfer_from").style.display = "block";
    document.getElementById("home").style.display = "none";
};

function goBack() {
    document.getElementById("transfer_from").style.display = "none";
    document.getElementById("home").style.display = "block";
};

function openImport() {
    document.getElementById("import_token").style.display = "block";
    document.getElementById("home").style.display = "none";
};

function importGoBack() {
    document.getElementById("import_token").style.display = "none";
    document.getElementById("home").style.display = "block";
};

function openActivity() {
    document.getElementById("activity").style.display = "block";
    document.getElementById("assets").style.display = "none";
};

function openAssets() {
    document.getElementById("activity").style.display = "none";
    document.getElementById("assets").style.display = "block";
};

function goHomePage() {
    document.getElementById("create_popUp").style.display = "none";
    document.getElementById("home").style.display = "block";
};

function openImportModel() {
    document.getElementById("import_account").style.display = "block";
    document.getElementById("home").style.display = "none";
};

function closeImportModel() {
    document.getElementById("import_account").style.display = "none";
    document.getElementById("home").style.display = "block";
};

function addToken() {
    const address =document.getElementById("token_address").value;
    const name =document.getElementById("token_name").value;
    const symbol =document.getElementById("token_symbol").value;

    const url = 'http://localhost:3000/api/v1/tokens/createtoken';
    const data = {
        name: name,
        address: address,
        symbol: symbol,
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((response) => response.json()).then((result) => {
        console.log(result);
        window.location.reload();
    }).catch((error) => {
        console.error('Error:', error);
    });
};

function addAccount() {
    const privateKey = document.getElementById("add_account_private_key").value;

    const provider = new ethers.providers.JsonRpcProvider(providerURL);

    let wallet = new ethers.Wallet(privateKey, provider);

    console.log(wallet);

    const url = 'http://localhost:3000/api/v1/account/createaccount';

    const data = {
        privateKey: privateKey,
        address: wallet.address,
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((response)=> response.json()).then((result) => {
        console.log(result);
        window.location.reload();
    }).catch((error) => {
        console.error('Error:', error);
    })
};

function myFunction() {

    const str = localStorage.getItem('userWallet');

    if (!str) {
        return;
    }

    const parsedObj = JSON.parse(str);

    if(parsedObj?.address) {
        document.getElementById("LoginUser").style.display = "none";
        document.getElementById("home").style.display = "block";

        privateKey = parsedObj.private_key;
        address = parsedObj.address;

        checkBalance(parsedObj.address);
    };

    const tokenRender = document.querySelector(".assets");
    const accountRender = document.querySelector(".accounList");

    const url = 'http://localhost:3000/api/v1/tokens/alltoken';

    fetch(url).then((response) => response.json()).then((data) => {
        let elements = "";

        data.data.tokens.map((token) => 
        (elements += `
        <div class = "assets_item">
        <img class = "assets_item_img" src = ".assets/theblockchaincoders.png" alt = "" />

        <span> ${token.address.slice(0,15)} </span>
        <>span> ${token.symbol} </span>
        </div>
    `)
     );
     tokenRender.innerHTML = elements;
    }).catch((error) => {
        console.error('Error:', error);
    });

    fetch('http://localhost:3000/api/v1/account/allaccount').then((response) => response.json()).then((data) => {
        let accounts = "";
        data.data.accounts.map((account, i) =>{
            (accounts += `
            <div class = "lists">
            <p> ${i + 1} </p>
            <p class = "accountValue" data-address=${account.address} data-privateKey=${account.privateKey} > ${account.address.slice(0, 25)}... </p>
            </div>
            `)
        });
        accountRender.innerHTML = accounts;
    }).catch((error) => {
        console.error('Error:', error);
    });

    console.log(privateKey);
};

function copyAddress() {
    navigator.clipboard.writeText(address);
};

function changeAccount() {
    const data = document.querySelectorAll(".accountValue");

    const address = data.getAttribute("data-address");
    const privateKey = data.getAttribute("data-privateKey");

    console.log(address, privateKey);

    const userWallet = {
        address: address,
        privateKey: privateKey,
        mnemonic: "changed"
    };

    const jsonObj = JSON.stringify(userWallet);
    localStorage.setItem('userWallet', jsonObj);
    
    window.location.reload();
};

window.onload = myFunction;