import { ImagesIcon, HomeIcon, TagIcon, UserIcon, UsersIcon } from '@sanity/icons';

/**
 * Simplified desk: grouped sections for non-technical editors.
 * @param {import('sanity/structure').StructureBuilder} S
 */
export const deskStructure = (S) =>
  S.list()
    .title('Website')
    .items([
      S.listItem()
        .title('Homepage')
        .icon(HomeIcon)
        .child(S.document().schemaType('homepage').documentId('homepage').title('Homepage')),
      S.listItem()
        .title('Photo gallery')
        .icon(ImagesIcon)
        .child(S.document().schemaType('gallery').documentId('gallery').title('Photo gallery')),
      S.divider(),
      S.listItem()
        .title('Services')
        .icon(TagIcon)
        .child(S.documentTypeList('service').title('Services').defaultOrdering([{ field: 'name', direction: 'asc' }])),
      S.listItem()
        .title('Team')
        .icon(UserIcon)
        .child(
          S.documentTypeList('teamMember').title('Team members').defaultOrdering([{ field: 'name', direction: 'asc' }])
        ),
      S.listItem()
        .title('Testimonials')
        .icon(UsersIcon)
        .child(
          S.documentTypeList('testimonial')
            .title('Customer reviews')
            .defaultOrdering([{ field: 'name', direction: 'asc' }])
        ),
    ]);
