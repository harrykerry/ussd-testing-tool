<script setup lang="ts">
import CodeBlock from "~/components/ui/CodeBlock.vue";
import GuideCallout from "~/components/guide/GuideCallout.vue";
import GuideSection from "~/components/guide/GuideSection.vue";
import { guideSections } from "~/constants/sections";
</script>

<template>
  <main class="min-h-screen bg-brand-background">
    <div class="mx-auto max-w-5xl px-6 py-8">
      <div class="mb-8">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-sm font-medium text-brand-ink-muted transition hover:text-brand-ink"
        >
          <Icon name="i-lucide-arrow-left" class="size-4" />

          Back to emulator
        </NuxtLink>
      </div>

      <div class="max-w-2xl">
        <h1 class="text-4xl font-semibold tracking-tight text-brand-ink">
          Building a USSD application
        </h1>

        <p class="mt-4 text-base leading-7 text-brand-ink-muted">
          A simple guide to understanding the request and response flow behind a
          USSD application.
        </p>
      </div>

      <div class="mt-12 grid gap-10 lg:grid-cols-[200px_minmax(0,1fr)]">
        <aside class="hidden lg:block">
          <nav class="sticky top-6 space-y-1">
            <a
              v-for="section in guideSections"
              :key="section.id"
              :href="`#${section.id}`"
              class="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-brand-ink-muted transition hover:bg-brand-surface-muted hover:text-brand-ink"
            >
              <Icon
                :name="section.icon"
                class="size-3.5 shrink-0 transition group-hover:text-brand-accent"
              />

              <span>{{ section.title }}</span>
            </a>
          </nav>
        </aside>

        <article
          class="min-w-0 lg:h-[calc(100vh-220px)] lg:overflow-y-auto lg:scroll-smooth lg:pr-3"
        >
          <GuideCallout title="Using a local callback" icon="i-lucide-globe-2">
            Tools such as ngrok can expose your local backend through a public
            HTTPS URL. Use that URL as the callback in the emulator.
          </GuideCallout>

          <GuideSection id="how-it-works" title="How USSD works">
            <p class="text-sm leading-6 text-brand-ink-muted">
              A user starts a USSD session by dialing a service code. The USSD
              gateway sends the request to your application, and your
              application responds with the next screen.
            </p>

            <GuideFlow />

            <p class="text-sm leading-6 text-brand-ink-muted">
              This emulator replaces the USSD gateway during development. It
              sends the same kind of request to your callback and displays the
              response.
            </p>
          </GuideSection>

          <GuideSection id="callback" title="Build your callback">
            <p class="text-sm leading-6 text-brand-ink-muted">
              Your backend needs an HTTP endpoint that accepts the USSD request
              and returns a plain-text response.
            </p>

            <CodeBlock filename="callback" type="HTTP" class="mt-5">
              POST /api/ussd
            </CodeBlock>
          </GuideSection>

          <GuideSection id="request" title="Request format">
            <p class="text-sm leading-6 text-brand-ink-muted">
              The emulator supports both GET and POST callbacks.
            </p>

            <h3 class="mt-6 text-sm font-semibold text-brand-ink">POST</h3>

            <p class="mt-2 text-sm leading-6 text-brand-ink-muted">
              POST requests contain the USSD data as JSON.
            </p>

            <CodeBlock filename="request.json" type="JSON" class="mt-4">
              { "sessionId": "123456789", "serviceCode": "*123#", "phoneNumber":
              "254700000000", "text": "1*2" }
            </CodeBlock>

            <h3 class="mt-6 text-sm font-semibold text-brand-ink">GET</h3>

            <p class="mt-2 text-sm leading-6 text-brand-ink-muted">
              GET requests contain the same values as URL query parameters.
            </p>

            <CodeBlock filename="request" type="HTTP" class="mt-4">
              GET /api/ussd ?sessionId=123456789 &amp;serviceCode=*123%23
              &amp;phoneNumber=254700000000 &amp;text=1*2
            </CodeBlock>
          </GuideSection>

          <GuideSection id="response" title="Response format">
            <p class="text-sm leading-6 text-brand-ink-muted">
              Your backend should return a plain-text response beginning with
              either <code>CON</code> or <code>END</code>.
            </p>

            <h3 class="mt-6 text-sm font-semibold text-brand-ink">CON</h3>

            <p class="mt-2 text-sm leading-6 text-brand-ink-muted">
              Use <code>CON</code> when you want the session to continue and
              expect more input.
            </p>

            <CodeBlock filename="response" type="TEXT" class="mt-4">
              CON Welcome to Acme 1. Check Balance 2. Buy Airtime
            </CodeBlock>

            <h3 class="mt-6 text-sm font-semibold text-brand-ink">END</h3>

            <p class="mt-2 text-sm leading-6 text-brand-ink-muted">
              Use <code>END</code> when the session is finished.
            </p>

            <CodeBlock filename="response" type="TEXT" class="mt-4">
              END Transaction successful
            </CodeBlock>
          </GuideSection>

          <GuideSection id="session" title="Session and text">
            <p class="text-sm leading-6 text-brand-ink-muted">
              The emulator generates a session ID when a session starts. The
              same ID is sent with every request during that session.
            </p>

            <p class="mt-4 text-sm leading-6 text-brand-ink-muted">
              The <code>text</code> value contains the user's input history
              separated by <code>*</code>.
            </p>

            <div
              class="mt-5 space-y-2 rounded-xl border border-brand-border-light bg-brand-surface-muted p-5 font-brand-mono text-xs"
            >
              <div>
                <span class="text-brand-ink-subtle">Input:</span>
                1
              </div>

              <div>
                <span class="text-brand-ink-subtle">Input:</span>
                2
              </div>

              <div>
                <span class="text-brand-ink-subtle">Input:</span>
                500
              </div>

              <div class="border-t border-brand-border pt-2">
                <span class="text-brand-ink-subtle">text:</span>
                1*2*500
              </div>
            </div>
          </GuideSection>

          <GuideSection id="local" title="Testing locally" :divider="false">
            <p class="text-sm leading-6 text-brand-ink-muted">
              You can point the emulator directly at a local backend, for
              example:
            </p>

            <CodeBlock filename="callback" type="URL" class="mt-4">
              http://localhost:8000/api/ussd
            </CodeBlock>

            <p class="mt-4 text-sm leading-6 text-brand-ink-muted">
              When the emulator is hosted online, your browser cannot normally
              access a callback running only on your machine. For local
              development, expose your backend through a secure tunnel.
            </p>

            <p class="mt-4 text-sm leading-6 text-brand-ink-muted mb-4">
              Your backend must also allow requests from the emulator through
              CORS. If the callback works with curl or Postman but not from the
              emulator, check your backend's CORS configuration.
            </p>
          </GuideSection>
        </article>
      </div>
    </div>
  </main>
</template>
