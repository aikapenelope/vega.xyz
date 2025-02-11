import React, { useState } from "react";
import { graphql } from "gatsby";
import Seo from "../../components/Seo";
import Layout from "../../components/Layout";
import TranslationsBanner from "../../components/TranslationsBanner";
import Container from "../../components/Container";
import MarketCreationResponsive from "../../components/Svg/MarketCreation/Hero/Responsive";
import PageSection from "../../components/PageSection";
import MarketCreationFooter from "../../components/Svg/MarketCreation/Footer";
import BoxTitle from "../../components/BoxTitle";
import ButtonLink from "../../components/ButtonLink";
import GlitchTitle from "../../components/GlitchTitle";
import BoxLinkSimple from "../../components/BoxLinkSimple";
import LeadingLine from "../../components/LeadingLine";
import Accordion from "../../components/Accordion/Accordion";
import Phase1 from "../../components/Svg/MarketCreation/Process/Phase1";
import Phase2 from "../../components/Svg/MarketCreation/Process/Phase2";
import Phase3 from "../../components/Svg/MarketCreation/Process/Phase3";
import Phase4 from "../../components/Svg/MarketCreation/Process/Phase4";
import Phase5 from "../../components/Svg/MarketCreation/Process/Phase5";
import Phase6 from "../../components/Svg/MarketCreation/Process/Phase6";
import { Trans, useTranslation } from "gatsby-plugin-react-i18next";

const marketCreationProcess = [
  {
    phase: "Phase 1",
    title: "Sense check your market idea",
    text: "<p>Start a topic and share an outline of the market you propose on the forum with a 'sense-check' tag. Get an idea of whether there is support for your proposal from the likes and replies you receive, and refine your plans.</p>",
    links: [
      {
        title: "Start a topic on the forum (Testnet)",
        url: "https://community.vega.xyz/c/fairground-testnet-governance/32",
      },
      {
        title: "See what markets exist already (Testnet)",
        url: "https://console.fairground.wtf/markets",
      },
    ],
    image: <Phase1 />,
  },
  {
    phase: "Phase 2",
    title: "Formalise your proposal",
    text: "<p>Update your proposal topic based on the feedback received, and ensure you have included the rationale and specifics of the the market, including the data (JSON or similar) that would be submitted on chain i.e. market name and code, Oracle / data source the market will use for settlement, and risk model (to calculate margin requirements and ensure safe trading).</p><p>Update the tag and invite debate and discussion to amend the proposal until it reaches a final state, ready to submit.</p>",
    links: [
      {
        title: "Read the docs to make a proposal (Testnet)",
        url: "https://docs.vega.xyz/docs/testnet/tutorials/proposals/new-market-proposal",
      },
      {
        title: "Check out the forum (Testnet)",
        url: "https://community.vega.xyz/c/fairground-testnet-governance/32",
      },
    ],
    image: <Phase2 />,
  },
  {
    phase: "Phase 3",
    title: "Submit your proposal",
    text: "<p>Once you have formalised your proposal and made any final amends, it is time to submit the proposal to the public chain using the APIs. Use the templates provided in the docs to convert your market definition from the forum post into a formal on-chain proposal.</p><p>A proposal cannot be changed once submitted - it will be validated by the nodes and enter straight into the voting period - therefore it's important to submit only when you are happy with the proposal's content. Anyone with the minimum number of $VEGA tokens, who has staked to a validator, can submit a new market proposal. Once submitted, head back to the forum to rally the community to vote.</p>",
    links: [
      {
        title: "Read the docs to make a proposal (Testnet)",
        url: "https://docs.vega.xyz/docs/testnet/tutorials/proposals/new-market-proposal",
      },
    ],
    image: <Phase3 />,
  },
  {
    phase: "Phase 4",
    title: "Get voting",
    text: "<p>If all your proposals inputs pass validation, community token holders consider and vote for or against active proposals using the governance dApp. Share your market ideas on the Vega forum to get the community motivated to vote for your proposal. Note, each public key with a minimum of 1 $VEGA gets just one vote per proposal.</p>",
    links: [
      {
        title: "Vote for proposals (Testnet)",
        url: "https://token.fairground.wtf/governance/",
      },
    ],
    image: <Phase4 />,
  },
  {
    phase: "Phase 5",
    title: "Attract liquidity",
    text: "<p>Any Vega participant with sufficient collateral* can provide liquidity for a market by submitting a transaction to the network. Attract liquidity with Vega's built-in incentive mechanism that matches traders and market makers.</p><p><i>*the size of the nominated liquidity commitment amount and the margins required to support the orders generated from that commitment.</i></p>",
    links: [
      {
        title: "Read the docs about liquidity provision (Testnet)",
        url: "https://docs.vega.xyz/docs/testnet/tutorials/providing-liquidity",
      },
    ],
    image: <Phase5 />,
  },
  {
    phase: "Phase 6",
    title: "Launch Market",
    text: "<p>If a proposal passes the vote, the market is enacted automatically, as soon as it has received enough committed liquidity.</p>",
    image: <Phase6 />,
  },
];

// t('Phase 1')
// t('Sense check your market idea')
// t('<p>Start a topic and share an outline of the market you propose on the forum with a \'sense-check\' tag. Get an idea of whether there is support for your proposal from the likes and replies you receive, and refine your plans.</p>')
// t('Start a topic on the forum (Testnet)')
// t('See what markets exist already (Testnet)')

// t('Phase 2')
// t('Formalise your proposal')
// t('<p>Update your proposal topic based on the feedback received, and ensure you have included the rationale and specifics of the the market, including the data (JSON or similar) that would be submitted on chain i.e. market name and code, Oracle / data source the market will use for settlement, and risk model (to calculate margin requirements and ensure safe trading).</p><p>Update the tag and invite debate and discussion to amend the proposal until it reaches a final state, ready to submit.</p>')
// t('Read the docs to make a proposal (Testnet)')
// t('Check out the forum (Testnet)')

// t('Phase 3')
// t('Submit your proposal')
// t('<p>Once you have formalised your proposal and made any final amends, it is time to submit the proposal to the public chain using the APIs. Use the templates provided in the docs to convert your market definition from the forum post into a formal on-chain proposal.</p><p>A proposal cannot be changed once submitted - it will be validated by the nodes and enter straight into the voting period - therefore it\'s important to submit only when you are happy with the proposal\'s content. Anyone with the minimum number of $VEGA tokens, who has staked to a validator, can submit a new market proposal. Once submitted, head back to the forum to rally the community to vote.</p>')

// t('Phase 4')
// t('Get voting')
// t('<p>If all your proposals inputs pass validation, community token holders consider and vote for or against active proposals using the governance dApp. Share your market ideas on the Vega forum to get the community motivated to vote for your proposal. Note, each public key with a minimum of 1 $VEGA gets just one vote per proposal.</p>')
// t('Vote for proposals (Testnet)')

// t('Phase 5')
// t('Attract liquidity')
// t('<p>Any Vega participant with sufficient collateral* can provide liquidity for a market by submitting a transaction to the network. Attract liquidity with Vega\'s built-in incentive mechanism that matches traders and market makers.</p><p><i>*the size of the nominated liquidity commitment amount and the margins required to support the orders generated from that commitment.</i></p>')
// t('Read the docs about liquidity provision (Testnet)')

// t('Phase 6')
// t('Launch Market')
// t('<p>If a proposal passes the vote, the market is enacted automatically, as soon as it has received enough committed liquidity.</p>')

const MarketCreationPage = () => {
  const { i18n, t } = useTranslation("page.market-creation");
  const [missingTranslations, setMissingTranslations] = useState(false);

  i18n.on("missingKey", (lng) => {
    setMissingTranslations(true);
  });

  return (
    <Layout>
      <Seo
        title={t("Market Creation with Vega")}
        description={t(
          "Bring the future of DeFi within reach - and create a market on any underlying. Attract liquidity with Vega's built-in incentive mechanism that matches traders and market makers."
        )}
      />
      {missingTranslations && <TranslationsBanner />}
      <Container dataCy={"main"}>
        <div className="max-w-[52rem] mx-auto text-center pt-6 lg:pt-24">
          <h1>
            <BoxTitle text={t("Governance")} />
          </h1>
          <GlitchTitle
            level="2"
            color="red"
            className="title-m md:title-l lg:title-xxl mb-4 md:mb-6 mt-4 text-center"
          >
            <Trans t={t}>Create markets</Trans>
          </GlitchTitle>
        </div>
        <div className="max-w-[44rem] mx-auto">
          <LeadingLine className="text-center">
            <Trans t={t}>
              Create a market on any underlying, and attract liquidity with
              Vega's built-in incentive mechanism that matches traders and
              market makers.
            </Trans>
          </LeadingLine>
        </div>
      </Container>
      <MarketCreationResponsive />
      <Container>
        <PageSection>
          <div className="max-w-[40rem] mx-auto text-center">
            <LeadingLine className="!mb-6 text-vega-mid-grey">
              <Trans t={t}>
                Creating a market is part of Vega governance. To get started,
                get and hold $VEGA tokens in your wallet.
              </Trans>
            </LeadingLine>
            <ButtonLink link="/governance/" text={t("Find out more")} />
          </div>
        </PageSection>

        <PageSection>
          <h2 className="title-m md:title-l mb-6 max-w-[30rem] md:max-w-[40rem] mx-auto md:mx-0">
            <Trans t={t}>How to create a new market on Vega</Trans>
          </h2>
          <Accordion data={marketCreationProcess} />
        </PageSection>

        <PageSection>
          <div className="text-center">
            <h2 className="title-m md:title-l lg:title-xxl mb-10">
              <Trans t={t}>Get started</Trans>
            </h2>

            <BoxLinkSimple
              className="max-w-[20rem] text-left"
              link="https://console.fairground.wtf/markets"
              text={t("See what markets already exist (Testnet)")}
            />
          </div>
        </PageSection>
      </Container>
      <MarketCreationFooter className="text-center" />
    </Layout>
  );
};

export default MarketCreationPage;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
