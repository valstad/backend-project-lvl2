install:
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

brain-games:
	node bin/brain-games.js

lint:
		npx eslint .

publish:
	npm publish --dry-run
