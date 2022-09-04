# Compound V3 Managers

Subgraph for storing the managers on Compound V3 with write access on the owner account.<br> 
Query the subgraph: [https://api.thegraph.com/subgraphs/name/richa-iitr/dsa-compound-v3-managers](https://api.thegraph.com/subgraphs/name/richa-iitr/dsa-compound-v3-managers)

**Build the subgraph**
<pre>
graph build --network mainnet
</pre>

### Query

<pre>
{
  owners {
    id
    address
    market
    manager {
      id
      address
      isAllowed
      isDSA
      market
      transactionData {
        id
        txnIndex
        txnLogIndex
        from
        to
        input
        blockNumber
        timestamp
        blockGasUsed
        gasPrice
        gasLimit
        value
      }
    }
  }
}
</pre>


