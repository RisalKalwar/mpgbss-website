# Metropolis Govt Boys Secondary School

School website for M.P.G.B.S.S, Saddar Town, Karachi.

**[Open the school website](https://mpgbss-website.metropolissouth12.workers.dev/)**

[Edit content in Pages CMS](https://app.pagescms.org/) · [GitHub repository](https://github.com/RisalKalwar/mpgbss-website)

## How the website works

The website uses HTML, CSS and JavaScript. Its editable content is stored in `content/site.json`, with photos in `images/`. Pages CMS gives school staff forms for editing these files. Cloudflare Workers hosts the public website.

When Cloudflare is connected to this repository and the branch staff edit, saving in Pages CMS creates a GitHub change that can trigger a new deployment. The update becomes public after that deployment succeeds. Publishing time varies.

The Cloudflare dashboard holds the deployment settings. This repository currently has no Wrangler configuration or GitHub Actions deployment workflow, so check the dashboard to confirm the repository, branch and deployment command.

## Website features

- Admissions banner in English and Urdu.
- School introduction, values, class sections and online-class information.
- Announcements with dates, categories, optional pictures and an Important flag.
- Teacher profiles with subjects, qualifications, sections, photos and introductions.
- Minister's message with optional photo and figures.
- Admission instructions, required documents and an admission enquiry form.
- Photo gallery, school profile, telephone and WhatsApp links.
- Mobile navigation and scroll animations.

The admission form prepares a summary in the visitor's browser. The visitor can copy it or open WhatsApp and send it to the Head Master. School staff confirm admission separately. The current code stores no admission records in a website database.

## Give school staff editing access

The repository owner or a GitHub user with the necessary repository access completes these steps.

1. Open Pages CMS and sign in with GitHub.
2. If requested, grant its GitHub app access to `RisalKalwar/mpgbss-website`.
3. Select the repository and the branch used for production deployment.
4. Open **School website** to check that the editing form loads.
5. Open **Collaborators**, enter the staff member's email and send the invitation.
6. Ask the staff member to open the invitation and sign in with that email.

Invited collaborators can edit the configured content and media using their own accounts. Repository users manage the editor configuration and collaborator invitations. Give each editor their own invitation.

[Pages CMS collaborator documentation](https://pagescms.org/docs/configuration/collaborators/)

## Edit school content

1. Sign in to Pages CMS.
2. Open the school repository, select the production branch and open **School website**.
3. Edit the relevant fields and click **Save**.
4. Wait for a successful Cloudflare deployment, then refresh the public website.

| Editor section | What staff can update |
| --- | --- |
| School details | School names, profile information and logo |
| Head Master | Name and phone number used by generated contact links |
| Top announcement | English and Urdu text and visibility |
| Top banner | Heading, introduction and highlight tags |
| Announcements | Section heading and individual notices |
| What we stand for | Heading, introduction and values |
| Minister's message | Visibility, role, name, photo, message and figures |
| Teachers | Section heading and individual teacher profiles |
| Classes and sections | Section headings and descriptions |
| Online classes | Heading, introduction and instruction points |
| Admissions | Steps, documents, reminder and banner text |
| Photo gallery | Heading, introduction, photos and captions |
| Contact | Heading, introduction, address, email and visit steps |
| Footer | Motto |

Some button labels, navigation labels and form fields are defined in the code. The Head Master photo field currently exists in Pages CMS, but the website displays initials in the contact card.

### Add a teacher

Open **Teachers**, add an entry to its teacher list, and enter the name, subjects, qualification and section. Upload a photo and optionally add a short introduction. Save the form. Profiles need a name to appear. Profiles without photos display initials.

### Publish an announcement

Open **Announcements**, add an entry, and fill in its title, date, category and details. A picture is optional. Mark it **Important** to highlight it. Up to three important notices also appear near the top of the page.

List order controls display order. The first six announcements appear initially, with a button to view the rest. An announcement needs a title to appear.

### Update photos and text

Add gallery entries under **Photo gallery**, upload each photo and enter a caption. The gallery appears when it contains an entry with an image. Use a blank line between paragraphs in the Minister's message and announcement details.

When changing the Head Master's number, also check any paragraphs that contain a number typed manually. Generated Call and WhatsApp links use the Head Master phone field.

## Check automatic publishing

1. Open the Cloudflare dashboard and go to **Workers & Pages**.
2. Select `mpgbss-website`, then **Settings → Builds**.
3. Check the Git repository connection and production branch against the repository and branch edited in Pages CMS.
4. If a connection is missing, connect the existing GitHub repository and configure deployment for this static website.
5. Save a real content correction in Pages CMS.
6. Confirm the change appears in GitHub, then check Cloudflare's build/deployment status.
7. Open the public website and confirm the correction appears.

For an existing working deployment, use its configured build and deployment settings. A manual file upload requires a later deployment to publish subsequent changes unless Git integration is configured.

[Cloudflare Workers Git integration documentation](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/)

## Files for developers

| File | Purpose |
| --- | --- |
| `index.html` | Page shell, header navigation, admission form and crest |
| `script.js` | Loads content, renders sections and handles interactions |
| `style.css` | Colours, layout, responsive styles and animations |
| `content/site.json` | Editable school content |
| `.pages.yml` | Pages CMS fields and media settings |
| `images/` | Uploaded website images |
| `favicon.svg` | Browser-tab icon |

### Preview locally

From the repository folder, run Python's local server.

```bash
python -m http.server 8000
```

On Windows, `py -m http.server 8000` also works when the Python launcher is installed. Open [the local preview](http://localhost:8000/). Serving the folder over HTTP allows JavaScript to fetch the JSON content.

### Add a new section

Most page sections are generated inside `render(c)` in `script.js`.

1. Add the section's content structure to the latest `content/site.json`.
2. Add matching fields to `.pages.yml` so staff can edit the content.
3. Render the section in `script.js` at the desired position. Use the existing escaping helpers for text.
4. Add styles in `style.css` where needed.
5. If the section needs navigation links, update the header in `index.html` and the footer generated in `script.js`.
6. Preview on desktop and mobile. Check empty content, images and links.
7. Commit the related changes together and verify the resulting deployment.

Use the latest repository content when making code changes so recent staff edits are preserved.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| Pages CMS has no School website form | Confirm `.pages.yml` exists on the selected branch and parses correctly. |
| Teacher or announcement is missing | Check the teacher's name or announcement's title, save, and check deployment status. |
| Saved edits do not appear publicly | Check the GitHub commit, Cloudflare branch, build logs and deployment result. Refresh after deployment succeeds. |
| Photo does not load | Check its saved path and exact filename, including capital letters, against `images/`. |
| Page says its content could not load | Check that `content/site.json` is valid JSON and was deployed with the site. |
| A field saves but has no visible effect | Check that `script.js` actually reads and renders that field. |

Use GitHub file history to recover an earlier value after an accidental edit, then commit the correction. Reverting an older version of the entire content file can also remove newer staff changes.

## Website address and QR code

Use the Cloudflare website address in school notices, presentations and QR codes.

https://mpgbss-website.metropolissouth12.workers.dev/

A QR code containing this address continues to work as content changes. Changing the address requires updating the QR code or maintaining a redirect from the original address.
