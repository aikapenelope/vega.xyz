import { gql, useQuery } from "@apollo/client";
import { useMemo } from "react";

export const NETWORK_PARAMETERS_QUERY = gql`
  query NetworkParams {
    networkParameters {
      key
      value
    }
  }
`;

export const NETWORK_PARAMETER_QUERY = gql`
  query NetworkParam($key: String!) {
    networkParameter(key: $key) {
      key
      value
    }
  }
`;

export const NetworkParams = {
  blockchains_ethereumConfig: "blockchains_ethereumConfig",
  reward_asset: "reward_asset",
  reward_staking_delegation_MinimumValidatorStake:
    "reward_staking_delegation_MinimumValidatorStake",
  reward_staking_delegation_payoutDelay:
    "reward_staking_delegation_payoutDelay",
  governance_proposal_updateMarket_requiredMajority:
    "governance_proposal_updateMarket_requiredMajority",
  governance_proposal_market_minClose: "governance_proposal_market_minClose",
  governance_proposal_market_maxClose: "governance_proposal_market_maxClose",
  governance_proposal_market_minEnact: "governance_proposal_market_minEnact",
  governance_proposal_market_maxEnact: "governance_proposal_market_maxEnact",
  governance_proposal_updateMarket_minClose:
    "governance_proposal_updateMarket_minClose",
  governance_proposal_updateMarket_maxClose:
    "governance_proposal_updateMarket_maxClose",
  governance_proposal_updateMarket_minEnact:
    "governance_proposal_updateMarket_minEnact",
  governance_proposal_updateMarket_maxEnact:
    "governance_proposal_updateMarket_maxEnact",
  governance_proposal_asset_minClose: "governance_proposal_asset_minClose",
  governance_proposal_asset_maxClose: "governance_proposal_asset_maxClose",
  governance_proposal_asset_minEnact: "governance_proposal_asset_minEnact",
  governance_proposal_asset_maxEnact: "governance_proposal_asset_maxEnact",
  governance_proposal_updateNetParam_minClose:
    "governance_proposal_updateNetParam_minClose",
  governance_proposal_updateNetParam_maxClose:
    "governance_proposal_updateNetParam_maxClose",
  governance_proposal_updateNetParam_minEnact:
    "governance_proposal_updateNetParam_minEnact",
  governance_proposal_updateNetParam_maxEnact:
    "governance_proposal_updateNetParam_maxEnact",
  governance_proposal_freeform_minClose:
    "governance_proposal_freeform_minClose",
  governance_proposal_freeform_maxClose:
    "governance_proposal_freeform_maxClose",
  governance_proposal_updateMarket_requiredParticipation:
    "governance_proposal_updateMarket_requiredParticipation",
  governance_proposal_updateMarket_minProposerBalance:
    "governance_proposal_updateMarket_minProposerBalance",
  governance_proposal_market_requiredMajority:
    "governance_proposal_market_requiredMajority",
  governance_proposal_market_requiredParticipation:
    "governance_proposal_market_requiredParticipation",
  governance_proposal_market_minProposerBalance:
    "governance_proposal_market_minProposerBalance",
  governance_proposal_asset_requiredMajority:
    "governance_proposal_asset_requiredMajority",
  governance_proposal_asset_requiredParticipation:
    "governance_proposal_asset_requiredParticipation",
  governance_proposal_asset_minProposerBalance:
    "governance_proposal_asset_minProposerBalance",
  governance_proposal_updateNetParam_requiredMajority:
    "governance_proposal_updateNetParam_requiredMajority",
  governance_proposal_updateNetParam_requiredParticipation:
    "governance_proposal_updateNetParam_requiredParticipation",
  governance_proposal_updateNetParam_minProposerBalance:
    "governance_proposal_updateNetParam_minProposerBalance",
  governance_proposal_freeform_requiredParticipation:
    "governance_proposal_freeform_requiredParticipation",
  governance_proposal_freeform_requiredMajority:
    "governance_proposal_freeform_requiredMajority",
  governance_proposal_freeform_minProposerBalance:
    "governance_proposal_freeform_minProposerBalance",
  validators_delegation_minAmount: "validators_delegation_minAmount",
  spam_protection_proposal_min_tokens: "spam_protection_proposal_min_tokens",
  market_liquidity_stakeToCcySiskas: "market_liquidity_stakeToCcySiskas",
  network_validators_ersatz_rewardFactor:
    "network_validators_ersatz_rewardFactor",
  network_validators_ersatz_multipleOfTendermintValidators:
    "network_validators_ersatz_multipleOfTendermintValidators",
  network_validators_multisig_numberOfSigners:
    "network_validators_multisig_numberOfSigners",
} as const;

type Params = typeof NetworkParams;
export type NetworkParamsKey = Params[keyof Params];
type Result = {
  [key in keyof Params]: string;
};

export const useNetworkParams = <T extends NetworkParamsKey[]>(params?: T) => {
  const { data, loading, error } = useQuery(NETWORK_PARAMETERS_QUERY);

  const paramsObj = useMemo(() => {
    if (!data?.networkParameters) return null;
    return data.networkParameters
      .map((p) => ({
        ...p,
        key: p.key.split(".").join("_"),
      }))
      .filter((p) => {
        if (params === undefined || params.length === 0) return true;
        if (params.includes(p.key as NetworkParamsKey)) return true;
        return false;
      })
      .reduce((obj, p) => {
        obj[p.key] = p.value;
        return obj;
      }, {} as { [key: string]: string });
  }, [data, params]);

  return {
    params: paramsObj as Pick<Result, T[number]>,
    loading,
    error,
  };
};

export const useNetworkParam = (param: NetworkParamsKey) => {
  const { data, loading, error } = useQuery(NETWORK_PARAMETER_QUERY, {
    variables: {
      key: param,
    },
  });
  return {
    param: data?.networkParameter ? data.networkParameter.value : null,
    loading,
    error,
  };
};
