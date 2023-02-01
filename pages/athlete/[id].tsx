import { GetServerSidePropsContext } from 'next';
import { ref, child, get } from 'firebase/database';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { Alert, Button } from '@mui/material';

import db from '../../lib/firebase';
import { ResultType } from '../../utils/types';
import ResultCard from '../../components/ResultCard';

const AthletePage = (props: ResultType) => {
  const resultRef = useRef<HTMLDivElement>(null);
  const [isError, setIsError] = useState(false);
  const { firstname, lastname } = props;

  const handleShare = async () => {
    if (resultRef.current === null) {
      return;
    }

    setIsError(false);
    const imageName = `Supersprint-Paris20-${firstname}-${lastname}.png`;

    try {
      const canvas = await html2canvas(resultRef.current);
      const image = canvas.toDataURL('image/png', 1.0);

      const blob = await (await fetch(image)).blob();
      const data = {
        files: [
          new File([blob], imageName, {
            type: blob.type,
          }),
        ],
        title: `Supersprint - ${firstname} ${lastname}`,
        text: `Finisher du Supersprint de Paris 20ième 2023: ${firstname} ${lastname}`,
      };

      if (navigator.canShare && navigator.canShare(data)) {
        navigator.share(data);
      } else {
        saveAs(image, imageName);
      }
    } catch {
      setIsError(true);
    }
  };

  return (
    <div>
      <div style={{ margin: 'auto', maxWidth: '450px' }}>
        <div ref={resultRef}>
          <ResultCard result={props} />
        </div>
      </div>
      <div style={{ margin: 'auto', maxWidth: '450px', paddingTop: '1rem' }}>
        {isError && (
          <Alert sx={{ marginBottom: '1rem' }} severity="warning">
            Nous sommes désolés le partage ne fonctionne pas sur cet appareil
          </Alert>
        )}
        <Button variant="contained" color="secondary" onClick={handleShare} fullWidth>
          Partager
        </Button>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{ props: ResultType }> {
  const { id } = context.query;
  const resultRef = child(ref(db), `results/${id}`);
  const results = await get(resultRef);

  return {
    props: results.val() || {},
  };
}

export default AthletePage;
