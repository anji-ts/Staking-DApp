import React from 'react';
import { useWeb3Contract } from 'react-moralis';
import StakingAbi from '../constants/Staking.json';
import TokenAbi from '../constants/RewardToken.json';
import { Form } from 'web3uikit';
import { ethers } from 'ethers';

function StakeForm() {
  const stakingAddress = "0x88875EeaA2093749f86EE475259749c8d0F7EF7c"; //replace this with the address where you have deployed your staking Smart Contract
  const tesTokenAddress = "0x874F16a8DbcaCc50Ba96153d88C83d43cA5C508F"; //replace this with the address where you have deployed your Reward Token Smart Contract

  const { runContractFunction } = useWeb3Contract();

  let approveOptions = {
    abi: TokenAbi.abi,
    contractAddress: tesTokenAddress,
    functionName: 'approve'
  };

  let stakeOptions = {
    abi: StakingAbi.abi,
    contractAddress: stakingAddress,
    functionName: 'stake'
  };

  async function handleStakeSubmit(data) {
    const amountToApprove = data.data[0].inputResult;
    approveOptions.params = {
      amount: ethers.utils.parseEther(amountToApprove, 'ether'),
      spender: stakingAddress
    };

    const tx = await runContractFunction({
      params: approveOptions,
      onError: (error) => console.log(error),
      onSuccess: () => {
        handleApproveSuccess(approveOptions.params.amount);
      }
    });
  }

  async function handleApproveSuccess(amountToStakeFormatted) {
    stakeOptions.params = {
      amount: amountToStakeFormatted
    };

    const tx = await runContractFunction({
      params: stakeOptions,
      onError: (error) => console.log(error)
    });

    // await tx.wait(0);
    console.log('Stake transaction complete');
  }

  return (
    <div className='text-black'>
      <Form
        onSubmit={handleStakeSubmit}
        data={[
          {
            inputWidth: '50%',
            name: 'Amount to stake ',
            type: 'number',
            value: '',
            key: 'amountToStake'
          }
        ]}
        title="Stake Now!"
      ></Form>
    </div>
  );
}

export default StakeForm;
