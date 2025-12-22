/**
 * Test to verify Jest and testing framework setup
 */

describe('Testing Framework Setup', () => {
  it('should run basic tests', () => {
    expect(true).toBe(true)
  })

  it('should have access to testing utilities', () => {
    expect(expect).toBeDefined()
    expect(describe).toBeDefined()
    expect(it).toBeDefined()
  })
})

describe('Fast-Check Property Testing Setup', () => {
  it('should be able to import fast-check', async () => {
    const fc = await import('fast-check')
    expect(fc).toBeDefined()
    expect(fc.assert).toBeDefined()
  })
})