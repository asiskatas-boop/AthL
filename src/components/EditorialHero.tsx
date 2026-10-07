import React from 'react';

type Props = {
  statement?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export default function EditorialHero({
  statement = 'AthL is a curatorial practice working across exhibitions, research, writing, and cultural production.',
  imageSrc,
  imageAlt = '',
}: Props) {
  return (
    <section className="athl-hero" id="top">
      <div className="athl-hero__statement">
        <p>{statement}</p>
      </div>
      <div className="athl-hero__visual" aria-hidden={!imageSrc}>
        {imageSrc ? (
          <img src={imageSrc} alt={imageAlt} />
        ) : (
          <div className="athl-image-placeholder">Primary portrait / installation image</div>
        )}
      </div>
      <div className="athl-contact-strip">
        <a href="mailto:hello@example.com">Email</a>
        <a href="#curatorial-work">Selected work</a>
        <a href="#publications">Publications</a>
        <a href="#cv">Curriculum vitae</a>
      </div>
    </section>
  );
}
