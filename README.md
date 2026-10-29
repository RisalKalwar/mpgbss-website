# Metropolis Govt Boys Secondary School: website

## What's in this folder

| File | What it is |
|---|---|
| `index.html`, `style.css`, `script.js` | The website itself. You don't need to edit these. |
| `content/site.json` | **All the words on the site.** Staff edit this through the editing panel. |
| `images/` | Photos uploaded by staff, such as the gallery, Head Master and Minister photos. |
| `.pages.yml` | Settings for the staff editing panel. |
| `favicon.svg` | The small crest icon shown in the browser tab. |

## Part 1: Put it online (one time, about 15 minutes)

### Step 1: Upload the files to GitHub (free)
1. Make an account at **github.com**.
2. Click **+**, choose **New repository**, name it `mpgbss-website`, keep it **Public**, and click **Create repository**.
3. Click **uploading an existing file**. Drag in **everything inside** this folder, including the `content` and `images` folders, then click **Commit changes**.
4. Check that `.pages.yml` uploaded. On a Mac, files that start with a dot are hidden, so it can get left out. If it's missing, click **Add file**, then **Create new file**. Type `.pages.yml` as the name, paste in the file's contents, and commit.

### Step 2: Publish it on Netlify (free, gives you the link)
1. Go to **app.netlify.com** and sign up with your GitHub account.
2. Click **Add new site**, then **Import an existing project**, then **GitHub**, and pick `mpgbss-website`.
3. Leave the build command **empty** and set the publish directory to **/**, then click **Deploy**.
4. You now have a link like `random-name-123.netlify.app`. To change it, go to **Site configuration**, then **Change site name**, and type for example `mpgbss-saddar`. The link becomes **https://mpgbss-saddar.netlify.app**.
5. Optional: under **Domain management**, you can connect a domain the school buys later, such as `mpgbss.edu.pk`.

### Step 3: Turn on the staff editing panel (Pages CMS, free)
1. Go to **app.pagescms.org** and sign in with GitHub.
2. Pick the `mpgbss-website` repository. You'll see forms for every section of the site.
3. To give school staff access, open **Collaborators** in Pages CMS and invite them **by email**. They don't need a GitHub account.

## Part 2: How staff edit the site

1. Open **app.pagescms.org** and sign in with the email invite.
2. Click **School website**.
3. Change any text, add a notice, upload photos, or turn the Minister's message on or off.
4. Click **Save**. The live site updates by itself within about a minute.

### Things staff can change
- **Notice board:** add, remove or reorder notices.
- **Top announcement:** the "Admissions open / داخلے جاری ہیں" banner. It can be turned off.
- **Head Master:** name, phone and photo. The phone number updates every Call and WhatsApp button.
- **Minister's message:** text, name, photo and figures.
- **Photo gallery:** upload photos. The gallery only appears once at least one photo is added.
- **Admissions:** steps and the documents list.
- **Logo:** upload an image to replace the built-in crest.
- Every heading and paragraph on the site.

Tip: in long text boxes such as the Minister's message, leave an **empty line** between paragraphs.
