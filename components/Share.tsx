'use client';

import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ResultType } from '@/utils/types';

import ResultCard from './ResultCard';

const Share = (props: ResultType) => {
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
      <div className="mx-auto max-w-115">
        <div ref={resultRef}>
          <ResultCard result={props} />
        </div>
      </div>
      <div className="mx-auto max-w-115 pt-4">
        {isError && (
          <Alert variant="warning" className="mb-4">
            <AlertDescription>Nous sommes désolés le partage ne fonctionne pas sur cet appareil</AlertDescription>
          </Alert>
        )}
        <Button variant="secondary" onClick={handleShare} className="w-full">
          Partager
        </Button>
      </div>
    </div>
  );
};

export default Share;
