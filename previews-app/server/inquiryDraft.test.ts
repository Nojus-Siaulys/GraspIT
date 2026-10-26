import test from "node:test"
import assert from "node:assert/strict"
import { completeInquiry, draftInquiry, inquiryFromParams } from "../src/site/inquiryDraft.ts"

test("every valid service path generates a complete draft without invented contact details", () => {
  for (const need of ["website", "shop", "redesign", "automation"]) {
    for (const prep of need === "automation" ? ["clear", "several", "explore"] : ["all", "some", "none"]) {
      for (const time of ["soon", "later", "unsure"]) {
        const text = draftInquiry([need, prep, time])
        assert.ok(text.startsWith("Sveiki,"))
        assert.ok(text.length > 200 && text.length < 2000)
        assert.doesNotMatch(text, /undefined|@|€|WordPress/)
        if (need === "automation") assert.doesNotMatch(text, /nuotrauk|Tekstų/)
      }
    }
  }
})
test("invalid and incompatible URL answers never generate a draft", () => {
  for (const answers of [["automation", "all", "soon"], ["website", "clear", "later"], ["toString", "all", "soon"], ["website", "all", "toString"], ["website"]]) {
    assert.equal(completeInquiry(answers), false)
    assert.equal(draftInquiry(answers), "")
  }
})
test("both current and earlier funnel links create the same draft and preserve project context", () => {
  const current = inquiryFromParams(new URLSearchParams("need=website&preparation=some&timing=later&pavyzdys=Kalvita&paketas=Pradinis"))
  const earlier = inquiryFromParams(new URLSearchParams({ paslauga: "Svetainė", turinys: "Turiu dalį turinio", terminas: "Per kelis mėnesius" }))
  assert.deepEqual(current.answers, earlier.answers)
  const text = draftInquiry(current.answers, current.context)
  assert.match(text, /Kalvita/)
  assert.match(text, /Pradinis/)
  assert.equal(current.service, "Svetainė")
})
test("a service-only link preselects the service without inventing answers", () => {
  const parsed = inquiryFromParams(new URLSearchParams({ paslauga: "El. parduotuvė" }))
  assert.deepEqual(parsed.answers, ["shop"])
  assert.equal(draftInquiry(parsed.answers), "")
})
