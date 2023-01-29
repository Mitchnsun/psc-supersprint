import { GetServerSidePropsContext } from 'next';
import { ref, child, get } from 'firebase/database';
import { useRef, useState } from 'react';
import { toBlob } from 'html-to-image';
import { saveAs } from 'file-saver';
import { Alert, Button } from '@mui/material';

import db from '../../lib/firebase';
import { ResultType } from '../../utils/types';
import ResultCard from '../../components/ResultCard';

const AthletePage = (props: ResultType) => {
  const resultRef = useRef(null);
  const [isError, setIsError] = useState(false);
  const { firstname, lastname } = props;

  const handleShare = async () => {
    setIsError(false);
    const imageName = `Supersprint-Paris20-${firstname}-${lastname}.png`;
    const image = (await toBlob(resultRef.current as unknown as HTMLElement)) as Blob;
    const data = {
      files: [
        new File([image], imageName, {
          type: image.type,
        }),
      ],
      title: 'Image',
      text: 'image',
    };

    if (navigator.canShare && navigator.canShare(data)) {
      console.log('can share');
      navigator
        .share(data)
        .then(() => console.log('Share was successful.'))
        .catch((error) => console.log('Sharing failed', error));
    } else {
      console.log('save as');
      saveAs(image, imageName);
    }
  };

  return (
    <div>
      <div ref={resultRef}>
        <ResultCard result={props} />
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
