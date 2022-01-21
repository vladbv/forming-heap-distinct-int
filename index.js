// Let's count the max heaps with an N number of district keys
 
let MAXN = 105; // that will be maximum value of N
 // The max heaps for thedistinct integers
let dp = new Array(MAXN);
 
// The  number of ways to choose j elements with nck[i][j]
let nck = new Array(MAXN);
for(let i=0;i<MAXN;i++)
{
    nck[i]=new Array(MAXN);
    for(let j=0;j<MAXN;j++)
    nck[i][j]=0;
}
 
// Floor of logarithm of base 2 of i
let log2 = new Array(MAXN);
 
 // Let's calculate nCk
function choose(n,k)
{
    if (k > n)
        {
            return 0;
        }
        if (n <= 1)
        {
            return 1;
        }
        if (k == 0)
        {
            return 1;
        }
   
        if (nck[n][k] != -1)
        {
            return nck[n][k];
        }
     let answer = choose(n - 1, k - 1) + choose(n - 1, k);
       nck[n][k] = answer;
       return answer;
}
 // calculate l for the given value of n
function getLeft(n)
{
   if (n == 1)     {
            return 0;
        }
   let h = log2[n];
   
        // max number of elements that can be present in the
        // hth level of any heap
        let numh = (1 << h); //(2 ^ h)
   
        // number of elements that are actually present in
        // last level(hth level)
        let last = n - ((1 << h) - 1)
        // if more than the half are filled
        if (last >= (numh / 2))
        {
            return (1 << h) - 1; 
        }
        else
        {
            return (1 << h) - 1 - ((numh / 2) - last);
        }
}
 
// Let's find the maximum number of heaps for n
function numberOfHeaps(n)
{  
    if (n <= 1)
        {
       return 1;
        }
        if (dp[n] != -1)
        {
         return dp[n];
        }
   
        let left = getLeft(n);
        let ans = (choose(n - 1, left) * numberOfHeaps(left))
                * (numberOfHeaps(n - 1 - left));
        dp[n] = ans;
        return ans;
}
 
// Let's initialize the arrays
function solve(n)
{
    for (let i = 0; i <= n; i++)
        {
            dp[i] = -1;
        }
   
        for (let i = 0; i <= n; i++)
        {
            for (let j = 0; j <= n; j++)
            {
                nck[i][j] = -1;
            }
        }
        let currLog2 = -1;
        let currPower2 = 1;
   
        // Let's find the logarithm
        for (let i = 1; i <= n; i++)
        {
            if (currPower2 == i)
            {
                currLog2++;
                currPower2 *= 2;
            }
            log2[i] = currLog2;
        }
   
        return numberOfHeaps(n);
}
 
// Defining N
let n = 5;
document.getElementById('getresult').innerHTML = solve(n);
 
