import { useState, useEffect, useCallback } from 'react';
import { Agentkit, SmartTransferAction, GetBalanceAction } from '@0xgasless/agentkit';
import { useAccount, useWalletClient } from 'wagmi';

export function useAgentKit() {
  const [agentkit, setAgentkit] = useState(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState(null);
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  // Initialize AgentKit with smart account
  const initializeAgentKit = useCallback(async () => {
    if (!isConnected || !walletClient || !walletClient.account?.privateKey) {
      setError('Wallet not connected or private key not available');
      return;
    }

    setIsInitializing(true);
    setError(null);

    try {
      // Get private key from wallet client
      let privateKey;
      if (walletClient.account?.privateKey) {
        privateKey = walletClient.account.privateKey;
      } else {
        // For demo purposes, we'll use a demo private key
        // In production, this should be handled more securely
        privateKey = '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
      }

      // Configure AgentKit with wallet
      const agentkitInstance = await Agentkit.configureWithWallet({
        privateKey,
        rpcUrl: process.env.REACT_APP_BASE_RPC_URL || 'https://mainnet.base.org',
        apiKey: process.env.REACT_APP_AGENTKIT_API_KEY || 'demo-key',
        chainID: Number(process.env.REACT_APP_DEFAULT_CHAIN_ID) || walletClient.chain?.id || 8453,
      });

      setAgentkit(agentkitInstance);
    } catch (err) {
      console.error('Failed to initialize AgentKit:', err);
      setError(err.message || 'Failed to initialize AgentKit');
    } finally {
      setIsInitializing(false);
    }
  }, [isConnected, walletClient]);

  // Get balance using AgentKit
  const getBalance = useCallback(async (tokenAddresses = null, tokenSymbols = null) => {
    if (!agentkit) {
      throw new Error('AgentKit not initialized');
    }

    try {
      const balanceAction = new GetBalanceAction();
      const result = await agentkit.run(balanceAction, {
        tokenAddresses,
        tokenSymbols,
      });
      return result;
    } catch (err) {
      console.error('Failed to get balance:', err);
      throw err;
    }
  }, [agentkit]);

  // Transfer tokens using AgentKit (gasless)
  const smartTransfer = useCallback(async (amount, tokenAddress, destination) => {
    if (!agentkit) {
      throw new Error('AgentKit not initialized');
    }

    try {
      const transferAction = new SmartTransferAction();
      const result = await agentkit.run(transferAction, {
        amount: amount.toString(),
        tokenAddress,
        destination,
      });
      return result;
    } catch (err) {
      console.error('Failed to execute smart transfer:', err);
      throw err;
    }
  }, [agentkit]);

  // Get smart account address
  const getSmartAccountAddress = useCallback(async () => {
    if (!agentkit) {
      throw new Error('AgentKit not initialized');
    }

    try {
      return await agentkit.getAddress();
    } catch (err) {
      console.error('Failed to get smart account address:', err);
      throw err;
    }
  }, [agentkit]);

  // Auto-initialize when wallet is connected
  useEffect(() => {
    if (isConnected && walletClient && !agentkit && !isInitializing) {
      initializeAgentKit();
    }
  }, [isConnected, walletClient, agentkit, isInitializing, initializeAgentKit]);

  return {
    agentkit,
    isInitializing,
    error,
    isReady: !!agentkit && !isInitializing,
    initializeAgentKit,
    getBalance,
    smartTransfer,
    getSmartAccountAddress,
  };
}