import React from 'react';

export type EditorialProject = {
  title: string;
  description: string;
  role?: string;
  credits?: string[];
  images?: { src: string; alt?: string }[];
  link?: string;
};

type Props = {
  projects: EditorialProject[];
};

export default function EditorialProjects({ projects }: Props) {
  return (
    <section id="curatorial-work" className="athl-projects" aria-label="Selected curatorial work">
      {projects.map((project, index) => (
        <article className="athl-project" key={`${project.title}-${index}`}>
          <div className="athl-project__info">
            <div>
              <p className="athl-project__title">{project.title}</p>
              <p className="athl-project__description">{project.description}</p>
              {project.link && <a className="athl-inline-link" href={project.link}>View project</a>}
            </div>
            <div className="athl-project__credits">
              {project.role && <p><strong>Role:</strong> {project.role}</p>}
              {project.credits?.map((credit) => <p key={credit}>{credit}</p>)}
            </div>
          </div>

          <div className="athl-media-strip">
            {project.images?.length ? project.images.map((image, imageIndex) => (
              <figure key={`${image.src}-${imageIndex}`} className="athl-media-strip__item">
                <img src={image.src} alt={image.alt ?? ''} loading="lazy" />
              </figure>
            )) : (
              <>
                <div className="athl-media-strip__item athl-image-placeholder">Project image 01</div>
                <div className="athl-media-strip__item athl-image-placeholder">Project image 02</div>
                <div className="athl-media-strip__item athl-image-placeholder">Project image 03</div>
              </>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}
