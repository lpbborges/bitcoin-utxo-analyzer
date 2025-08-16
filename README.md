Bitcoin UTXO Analyzer

✨ Key Features

- **Wallet Visualization:** Get a clear inventory and value distribution of your UTXOs.
- **Efficiency Analysis:** Identify "dust" UTXOs.
- **Privacy Audit:** Receive a "Privacy Score" by detecting bad practices like address reuse.

🚀 The Three Pillars of Analysis

The project is based on three fundamental areas of analysis:

1.  **Fee Efficiency**
    - **Objective:** Help the user minimize transaction fee expenses over time.
    - **Functionalities:**
      - **"Dust" Identification:** Finds UTXOs whose value is so low that the cost to spend them would be higher than or almost equal to their value.
      - **Fragmentation Visualization:** Shows a graph representing the wallet's fragmentation. Many small "slices" mean high fragmentation and potentially high future costs.

2.  **Privacy Score**
    - **Objective:** Analyze the transaction history to identify practices that may have compromised privacy.
    - **Functionalities:**
      - **Address Reuse Detection:** Identifies addresses that have been used to receive funds more than once.
      - **"Common-Input-Ownership" Analysis:** Checks if the user's UTXOs have ever been combined in transactions with external addresses, which could link the user's identity to other entities.

3.  **Visualization and Inventory**
    - **Objective:** Give the user a clear and intuitive view of where their funds are.
    - **Functionalities:**
      - **Detailed UTXO Listing:** A clear table showing each UTXO, its value in BTC and sats, the corresponding address, and its "age".
      - **Value Distribution Chart:** Shows how the total balance is distributed among the UTXOs.

🗺️ Development Plan (Roadmap)

This is the step-by-step development plan for the project.

**Phase 1: Minimum Viable Product (MVP)**

- [x] **Basic UI:** Create a page with a text field for the xpub and an "Analyze" button.
- [x] **Address Derivation:** Use bitcoinjs-lib to derive the first 20 receiving and 20 change addresses (BIP84 standard).
- [x] **UTXO Search:** Make API calls to mempool.space to fetch the UTXOs for each derived address.
- [x] **Simple Display:** Aggregate and display all UTXOs in a table, showing the value, address, and total balance.

**Phase 2: Implementing Efficiency Analysis**

- [ ] **Fee Search:** Integrate the mempool.space fee API call.
- [ ] **Dust Logic:** Calculate the transaction cost for each UTXO and mark it as "dust" if the cost is economically unfeasible.
- [ ] **Consolidation Logic:** Create the function that simulates a consolidation transaction and calculates its cost based on current fees to display a suggestion.
- [ ] **Fragmentation Chart:** Add the wallet fragmentation visualization.

**Phase 3: Implementing Privacy Analysis**

- [ ] **Transaction History Search:** For each address, fetch its transaction history via API.
- [ ] **Address Reuse Logic:** Check if any address has been used more than once.
- [ ] **Privacy UI:** Create a section in the interface that shows the reused addresses, explains the risk, and presents the Privacy Score.

**Phase 4: Advanced Features**

- [ ] **Support for Multiple xpub Types:** Add support for ypub (Nested SegWit) and other derivation paths.
- [ ] **"Coin Control" and Transaction Building:** The "killer" feature: allow the user to select UTXOs, set a destination and a fee, and generate the unsigned transaction in PSBT (Partially Signed Bitcoin Transaction) format.

📄 License

This project is distributed under the MIT license. See the LICENSE file for more details.
