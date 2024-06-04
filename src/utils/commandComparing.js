module.exports = (localCommand, existingCommand) => {
  const commandChoices = (choices = []) => {
    return choices.map((choice) => ({
      name: choice.name,
      nameLocalizations: (choice.nameLocalizations ?? choice.name_localizations) ?? undefined,
      value: choice.value
    }));
  };

  const commandOptions = (options = []) => {
    return options.map((option) => ({
      type: option.type ?? 1,
      name: option.name,
      nameLocalizations: (option.nameLocalizations ?? option.name_localizations) ?? undefined,
      description: option.description,
      descriptionLocalizations: (option.descriptionLocalizations ?? option.description_localizations) ?? undefined,
      options: commandOptions(option.options) ?? undefined,
      autocomplete: option.autocomplete ?? undefined,
      channelTypes: (option.channelTypes ?? option.channel_types) ?? undefined,
      choices: commandChoices(option.choices) ?? undefined,
      minValue: (option.minValue ?? option.min_value) ?? undefined,
      maxValue: (option.maxValue ?? option.max_value) ?? undefined,
      minLength: (option.minLength ?? option.min_length) ?? undefined,
      maxLength: (option.maxLength ?? option.max_length) ?? undefined,
      required: option.required ?? false
    }));
  };

  const commandData = (data) => ({
    nameLocalizations: (data.nameLocalizations ?? data.name_localizations) ?? undefined,
    description: data.description,
    descriptionLocalizations: (data.descriptionLocalizations ?? data.description_localizations) ?? undefined,
    options: commandOptions(data.options) ?? undefined,
    defaultMemberPermissions: (data.defaultMemberPermissions ?? data.default_member_permissions) ?? undefined,
    dmPermission: (data.dmPermission ?? data.dm_permission) ?? true,
    nsfw: data.nsfw ?? false
  });

  if (
    JSON.stringify(commandData(localCommand), (_, v) => typeof v === "bigint" ? v.toString() : v)
    !==
    JSON.stringify(commandData(existingCommand), (_, v) => typeof v === "bigint" ? v.toString() : v)
  ) return true;

  return false;
};