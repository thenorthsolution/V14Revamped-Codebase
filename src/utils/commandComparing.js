module.exports = (localCommand, existingCommand) => {
  const commandChoices = (choices = []) => {
    return choices.map((choice) => ({
      name: choice.name,
      nameLocalizations: (choice.nameLocalizations ?? choice.name_localizations) ?? {},
      value: choice.value
    }));
  };

  const commandOptions = (options = []) => {
    return options.map((option) => ({
      type: option.type ?? 1,
      name: option.name,
      nameLocalizations: (option.nameLocalizations ?? option.name_localizations) ?? {},
      description: option.description,
      descriptionLocalizations: (option.descriptionLocalizations ?? option.description_localizations) ?? {},
      options: commandOptions(option.options) ?? [],
      autocomplete: option.autocomplete ?? null,
      channelTypes: (option.channelTypes ?? option.channel_types) ?? null,
      choices: commandChoices(option.choices) ?? [],
      minValue: (option.minValue ?? option.min_value) ?? null,
      maxValue: (option.maxValue ?? option.max_value) ?? null,
      minLength: (option.minLength ?? option.min_length) ?? null,
      maxLength: (option.maxLength ?? option.max_length) ?? null,
      required: option.required ?? false
    }));
  };

  const commandData = (data) => ({
    name: data.name,
    nameLocalizations: (data.nameLocalizations ?? data.name_localizations) ?? {},
    description: data.description,
    descriptionLocalizations: (data.descriptionLocalizations ?? data.description_localizations) ?? {},
    options: commandOptions(data.options) ?? [],
    defaultMemberPermissions: (data.defaultMemberPermissions ?? data.default_member_permissions) ?? null,
    dmPermission: (data.dmPermission ?? data.dm_permission) ?? true,
    nsfw: data.nsfw ?? false
  });

  if (
    JSON.stringify(commandData(localCommand), (_, v) => typeof v === "bigint" ? v.toString() : v)
    !==
    JSON.stringify(commandData(existingCommand), (_, v) => typeof v === "bigint" ? v.toString() : v)
  ) return commandData(localCommand);

  return false;
};