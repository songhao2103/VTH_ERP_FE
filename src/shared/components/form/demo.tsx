import * as React from "react";
import { useAppForm } from "./useAppForm";

type ContactItem = {
  type: string;
  value: string;
  primary: boolean;
};

type ProfileFormValues = {
  role: string;
  bio: string;
  acceptTerms: boolean;
  birthDate: string;
  contacts: ContactItem[];
};

const ROLE_OPTIONS = [
  { label: "Admin", value: "admin" },
  { label: "Editor", value: "editor" },
  { label: "Viewer", value: "viewer" },
] as const;

// const CONTACT_TYPE_OPTIONS = [
//   { label: "Email", value: "email" },
//   { label: "Phone", value: "phone" },
//   { label: "Telegram", value: "telegram" },
// ] as const;

export function ProfileForm(): React.JSX.Element {
  const form = useAppForm({
    defaultValues: {
      role: "",
      bio: "",
      acceptTerms: false,
      birthDate: "",
      contacts: [],
    } satisfies ProfileFormValues,
    validators: {
      onChange: ({ value }) => ({
        fields: {
          role: !value.role ? "Role is required." : undefined,
          bio: !value.bio.trim()
            ? "Bio is required."
            : value.bio.trim().length < 10
              ? "Bio must be at least 10 characters."
              : undefined,
          acceptTerms: !value.acceptTerms
            ? "You must accept the terms."
            : undefined,
          birthDate: !value.birthDate ? "Birth date is required." : undefined,
          contacts:
            value.contacts.length === 0
              ? "Please add at least one contact."
              : undefined,
        },
      }),
    },
    onSubmit: async ({ value }) => {
      console.log("profile payload", value);
    },
  });

  return (
    <form.AppForm>
      <form.FormRoot className="w-full max-w-3xl">
        <form.AppField name="role">
          {(field) => (
            <field.SelectBase
              label="Role"
              placeholder="Select a role"
              options={ROLE_OPTIONS.map((option) => ({
                label: option.label,
                value: option.value,
              }))}
            />
          )}
        </form.AppField>

        <form.AppField name="bio">
          {(field) => (
            <field.TextareaBase
              label="Bio"
              description="Write a short introduction about yourself."
              placeholder="Tell something about yourself"
              rows={5}
            />
          )}
        </form.AppField>

        <form.AppField name="birthDate">
          {(field) => (
            <field.DatePickerBase
              label="Birth date"
              description="Stored as YYYY-MM-DD."
            />
          )}
        </form.AppField>

        <form.AppField name="acceptTerms">
          {(field) => (
            <field.CheckboxBase
              label="Accept terms"
              description="You must accept the terms before submitting."
            />
          )}
        </form.AppField>

        {/* <form.AppField name="contacts" mode="array">
          {(field) => (
            <field.FieldArray
              label="Contacts"
              description="Add one or more contact methods."
              addLabel="Add contact"
              emptyMessage="No contacts added yet."
              createItem={() => ({
                type: "email",
                value: "",
                primary: false,
              })}
              getItemKey={(_, index) => index}
            >
              {({
                index,
                remove,
                moveUp,
                moveDown,
                canMoveUp,
                canMoveDown,
              }) => (
                <>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <form.AppField name={`contacts[${index}].type`}>
                      {(subField) => (
                        <subField.SelectBase
                          label="Type"
                          options={CONTACT_TYPE_OPTIONS.map((option) => ({
                            label: option.label,
                            value: option.value,
                          }))}
                        />
                      )}
                    </form.AppField>

                    <form.AppField name={`contacts[${index}].value`}>
                      {(subField) => (
                        <subField.InputBase
                          label="Value"
                          placeholder="Enter contact value"
                        />
                      )}
                    </form.AppField>

                    <form.AppField name={`contacts[${index}].primary`}>
                      {(subField) => (
                        <subField.CheckboxBase
                          label="Primary contact"
                          className="mt-1"
                        />
                      )}
                    </form.AppField>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={moveUp}
                      disabled={!canMoveUp}
                      className="rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Move up
                    </button>

                    <button
                      type="button"
                      onClick={moveDown}
                      disabled={!canMoveDown}
                      className="rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Move down
                    </button>

                    <button
                      type="button"
                      onClick={remove}
                      className="rounded-md border px-3 py-2 text-sm text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </>
              )}
            </field.FieldArray>
          )}
        </form.AppField> */}

        <form.SubmitButton loadingText="Saving...">
          Save profile
        </form.SubmitButton>
      </form.FormRoot>
    </form.AppForm>
  );
}
