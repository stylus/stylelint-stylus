import * as stylelint from 'stylelint';
import { TwoslashGenericFunction } from 'twoslash-protocol';

interface CreateTwoslashStylelintOptions {
    /**
     * Flat configs for Stylelint
     */
    stylelintConfig: stylelint.Config;
    /**
     * Custom code transform before sending to Stylelint for verification
     *
     * This does not affect the code rendering
     */
    stylelintCodePreprocess?: (code: string) => string;
    /**
     * The current working directory for Stylelint
     */
    cwd?: string;
    /**
     * Include the parsed docs in the result
     *
     * @default true
     */
    includeDocs?: boolean;
    /**
     * Merge error messages that has same range
     * @default true
     */
    mergeMessages?: boolean;
}
declare function createTwoslasher(options: CreateTwoslashStylelintOptions): TwoslashGenericFunction;

export { type CreateTwoslashStylelintOptions, createTwoslasher };
