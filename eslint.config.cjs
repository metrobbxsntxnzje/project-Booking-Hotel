const tryRequire = (name) => {
	try {
		return require(name);
	} catch {
		return null;
	}
};

const pluginN = tryRequire('eslint-plugin-n');

const baseRules = {
	'array-callback-return': 'error',
	'consistent-return': 'warn',
	curly: ['warn', 'all'],
	eqeqeq: ['warn', 'always'],
	'no-console': 'off',
	'no-constant-condition': ['error', { checkLoops: false }],
	'no-dupe-args': 'error',
	'no-dupe-keys': 'error',
	'no-duplicate-case': 'error',
	'no-fallthrough': 'warn',
	'no-func-assign': 'error',
	'no-global-assign': 'error',
	'no-import-assign': 'error',
	'no-loss-of-precision': 'error',
	'no-redeclare': 'error',
	'no-shadow': 'warn',
	'no-unreachable': 'error',
	'no-undef': 'error',
	'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
	'no-use-before-define': ['warn', { functions: false, classes: true, variables: true }],
	'no-useless-catch': 'warn',
	'object-shorthand': ['warn', 'always'],
	'prefer-const': 'warn',
	'prefer-template': 'warn',
	'valid-typeof': 'error',
};

const plugins = {};

if (pluginN) {
	plugins.n = pluginN;
	baseRules['n/exports-style'] = ['error', 'module.exports'];
	baseRules['n/no-missing-require'] = 'error';
	baseRules['n/no-unpublished-require'] = 'off';
}

module.exports = [
	{
		ignores: ['node_modules/**', 'logs/**', 'coverage/**', 'dist/**', 'build/**'],
	},
	{
		files: ['**/*.js'],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'commonjs',
			globals: {
				Buffer: 'readonly',
				__dirname: 'readonly',
				__filename: 'readonly',
				clearInterval: 'readonly',
				clearTimeout: 'readonly',
				console: 'readonly',
				exports: 'readonly',
				module: 'readonly',
				process: 'readonly',
				require: 'readonly',
				setInterval: 'readonly',
				setTimeout: 'readonly',
			},
		},
		linterOptions: {
			reportUnusedDisableDirectives: 'warn',
		},
		plugins,
		rules: baseRules,
	},
];
