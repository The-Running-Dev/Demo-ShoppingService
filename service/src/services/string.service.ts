export class StringService
{
    public Format(formatString: string, ...values): string {
        if (values.length == 0) return formatString;

        return formatString.replace(/{(\d+)}/g, function(match, number) {
            return typeof values[number] != null
                ? values[number]
                : match
        });
    }
}