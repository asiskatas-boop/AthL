import React from 'react';

type CVGroup = {
  heading: string;
  entries: string[];
};

type Props = {
  bio?: string;
  imageSrc?: string;
  groups?: CVGroup[];
};

const defaultGroups: CVGroup[] = [
  { heading: 'Selected Projects', entries: ['Add project / institution / year', 'Add project / institution / year'] },
  { heading: 'Research + Writing', entries: ['Add essay / publication / year', 'Add research item / year'] },
  { heading: 'Institutional Record', entries: ['Add institution / role / year', 'Add fellowship / programme / year'] },
];

export default function EditorialCV({
  bio = 'Replace this paragraph with the existing AthL biographical statement. Keep it concise and factual: practice, research focus, institutional context, and current location if relevant.',
  imageSrc,
  groups = defaultGroups,
}: Props) {
  return (
    <section id="cv" className="athl-cv">
      <div className="athl-cv__top">
        <div className="athl-cv__bio"><p>{bio}</p></div>
        <div className="athl-cv__portrait">
          {imageSrc ? <img src={imageSrc} alt="" /> : <div className="athl-image-placeholder">Portrait / installation detail</div>}
        </div>
      </div>
      <div className="athl-cv__columns">
        {groups.map((group) => (
          <section key={group.heading}>
            <h3>{group.heading}</h3>
            {group.entries.map((entry, i) => <p key={`${entry}-${i}`}>{entry}</p>)}
          </section>
        ))}
      </div>
    </section>
  );
}
