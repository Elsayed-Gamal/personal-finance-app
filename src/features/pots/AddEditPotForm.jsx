import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getThemes } from "../../services/apiThemes";

function AddEditPotForm({
  methods,
  potName: initialPotName,
  potTarget: initialPotTarget,
  potTheme: initialPotTheme,
}) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = methods;
  const [isOpen, setIsOpen] = useState(false);

  const potName = watch("potName", initialPotName || "");
  const currentPotTheme = watch("potTheme", initialPotTheme || "");

  const activeThemeHex = currentPotTheme || initialPotTheme;

  useEffect(() => {
    setValue("potTheme", initialPotTheme || "");
  }, [initialPotTheme, setValue]);

  const {
    data: themes,
    isError,
    error,
    isPending,
  } = useQuery({
    queryKey: ["themes"],
    queryFn: () => getThemes(),
  });

  const selectedTheme = themes?.find(
    (theme) => theme.hex_code === activeThemeHex,
  );

  return (
    <form className="text-grey-500 flex flex-col gap-4 [&>div]:flex [&>div]:flex-col [&>div]:gap-1">
      <div>
        <label htmlFor="pot-name" style={{ font: "var(--text-preset-5-bold)" }}>
          Pot Name
        </label>
        <input
          type="text"
          id="pot-name"
          className="form-input"
          placeholder="e.g. Rainy Days"
          defaultValue={initialPotName}
          max={30}
          {...register("potName", {
            required: "Pot name is required",
            maxLength: { value: 30, message: "Max 30 characters" },
          })}
        />
        {errors.potName && (
          <span className="text-red text-xs">{errors.potName.message}</span>
        )}
        <span className="self-end" style={{ font: "var(--text-preset-5)" }}>
          {30 - potName.length} characters left
        </span>
      </div>
      <div>
        <label
          htmlFor="pot-target"
          style={{ font: "var(--text-preset-5-bold)" }}
        >
          Target
        </label>
        <input
          type="number"
          id="pot-target"
          className="form-input"
          placeholder="e.g. 2000"
          defaultValue={initialPotTarget}
          {...register("potTarget", {
            required: "Target is required",
            min: { value: 0, message: "Target must be positive" },
          })}
        />
        {errors.potTarget && (
          <span className="text-red text-xs">{errors.potTarget.message}</span>
        )}
      </div>
      <div className="relative">
        <label
          htmlFor="pot-theme"
          style={{ font: "var(--text-preset-5-bold)" }}
        >
          Theme
        </label>
        <input
          type="hidden"
          {...register("potTheme", { required: "Theme is required" })}
        />
        <button
          type="button"
          className="form-input flex w-full items-center gap-3 text-left"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedTheme ? (
            <>
              <span
                className="inline-block h-4 w-4 rounded-full"
                style={{ backgroundColor: selectedTheme.hex_code }}
              ></span>
              {selectedTheme.color}
            </>
          ) : (
            "Select a theme"
          )}
        </button>
        {errors.potTheme && (
          <span className="text-red text-xs">{errors.potTheme.message}</span>
        )}
        {isOpen && (
          <div className="border-beige-500 absolute z-10 mt-1 max-h-30 w-full overflow-auto rounded-lg border bg-white shadow-lg">
            {isPending && <div className="p-3">Loading themes...</div>}
            {isError && <div className="p-3">Error: {error.message}</div>}
            {themes?.map((theme) => (
              <button
                type="button"
                key={theme.color}
                className="hover:bg-grey-100 text-grey-900 flex w-full items-center gap-3 p-3 text-left"
                onClick={() => {
                  setValue("potTheme", theme.hex_code, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                  setIsOpen(false);
                }}
              >
                <span
                  className="inline-block h-4 w-4 rounded-full"
                  style={{ backgroundColor: theme.hex_code }}
                ></span>
                {theme.color}
              </button>
            ))}
          </div>
        )}
      </div>
    </form>
  );
}

export default AddEditPotForm;
