import React from 'react';
import { FormattedMessage as F } from 'react-intl';
import useInngang from '../../hooks/useInngang';
import useBrukernotifikasjoner from '../../hooks/useBrukernotifikasjoner';
import useInaktiveBrukernotifikasjoner from '../../hooks/useInaktiveBrukernotifikasjoner';
import Brukernotifikasjoner from './Brukernotifikasjoner';
import PaabegynteSoknader from './meldinger/PaabegynteSoknader';
import Meldekort from './meldinger/meldekort/Meldekort';
import EtterregistreringMeldekort from './meldinger/EtterregistreringMeldekort';
import MinInnboks from './meldinger/MinInnboks';
import InngangVarslinger from './InngangVarslinger';

const InfoMeldinger = () => {
  const [beskjeder, { data: oppgaver }, { data: innbokser }] = useBrukernotifikasjoner();
  const [inaktiveBeskjeder, { data: inaktiveOppgaver }, { data: inaktiveInnbokser }] = useInaktiveBrukernotifikasjoner();
  const [visInngangTilVarslinger] = useInngang(inaktiveBeskjeder, inaktiveOppgaver, inaktiveInnbokser);

  return (
    <section className="infomeldinger-list">
      <h1 className="skjermleser"><F id="dittnav.infomeldinger.varsler" /></h1>
      <Brukernotifikasjoner beskjeder={beskjeder} oppgaver={oppgaver} innbokser={innbokser} erAktiv />
      <Meldekort />
      <EtterregistreringMeldekort />
      <PaabegynteSoknader />
      <MinInnboks />
      {visInngangTilVarslinger ? <InngangVarslinger /> : null}
    </section>
  );
};

export default InfoMeldinger;