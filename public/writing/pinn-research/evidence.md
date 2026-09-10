# PINN Research — evidence and reproducibility record

Reviewed September 10, 2026 against https://github.com/aidxhxr/PINN-Research and its saved research archive. Paths below are relative to that repository. The numerical run directories are tracked; dated notes are local working records. No training or simulations were rerun to prepare the article. Previously generated numerical artifacts were inspected, and recovery counts were recalculated from saved parameter JSON files.

## How to read the results

- Recovery means `abs(estimate - truth) / abs(truth) < 0.10`. Counts summed over four regimes are parameter–regime instances, not unique parameters or independent replicates.
- Original names `Cancer-like` and `Strong APC-mutant` correspond to `Advanced Adenoma` and `Severe APC Loss`.
- Multiple starts use the same underlying data recipe. They do not provide independent-dataset error bars.
- Forward relative L2 is the error norm divided by reference norm. Forward NRMSE divides RMSE by the reference range. Hybrid functional NRMSE divides RMS function error by RMS true function. These metrics are not interchangeable.
- Full scalar hybrid functions are scored at 400 uniformly spaced inputs over the covered span. Local screens score sampled reference-trajectory inputs. Multivariate functions are evaluated on visited combinations. Changed support changes the evaluation measure.
- Full inverse PINNs estimate states and parameters. Equation-local screens take exact reference states and hold parameters outside the selected equation at truth. The screen results are optimistic diagnostics, not full inverse results or mathematical bounds.

## Early implementations and forward experiments

`notebooks/wnt_pinn_starter.ipynb` preserves a two-state APC/beta-catenin example, tanh width 64/depth 4, 30 observations and 2,000 collocation points, with supervised then physics training. `notebooks/PINN_forward.ipynb` and its copy preserve the 27-state windowed implementation (width 128/depth 5, horizon 30,000, windows 1,000). `modelsys_2025_k16dynamic_converted.ipynb` preserves the parent-model translation. These establish implementations, not a verified MATLAB-parity benchmark or successful completion of every window.

The June 20 Fourier checkpoint was `PINN-smaller/forward_pinn_train/runs/20260620_074205/Normal_final.pt`; the June 24 working note records the stale-plot diagnosis and checkpoint re-evaluation MSE of 1.45e-5. It used 3,000 labels. The later results use different runs:

| Configuration | Saved artifact | Mean relative L2 by regime |
| --- | --- | --- |
| Supervised, 100 labels | `PINN-smaller/forward_pinn_train/runs/20260711_203325/forward_error_table.txt` | 0.49 / 0.65 / 1.17 / 1.91% |
| Sparse, 40 observations | `PINN-smaller/forward-pinn-train-hybrid/runs/20260712_204546/forward_error_table.txt` | 2.83 / 1.76 / 2.09 / 2.95% |

Grand means: 1.06% and 2.41% respectively. Corresponding range-normalized RMSE means: 0.56% and 1.68%. Sparse Severe APC: 13.53% relative L2 versus 1.26% range-normalized RMSE.

Limitations: the archived plain network uses horizon 3,000 versus 150 in the Fourier case. A matched 40-point physics-off control is absent. Neither comparison isolates a single architectural or loss contribution.

## Mechanistic inverse lineage

Counts were checked from `*_recovered.json` with the rule above. Order is Normal / Early / Advanced / Severe.

| Run | Recovery |
| --- | --- |
| `PINN-inverse-solve/runs/20260625_145557` | 2/2/1/1, out of 2 |
| `PINN-inverse-solve/runs/20260626_033117` | 4/8/7/7, out of 36 |
| `PINN-inverse-better/runs/20260629_162528` | 8/12/6/4 |
| `PINN-inverse-multicond/runs/20260630_042144` | 10/4/5/7 |
| `PINN-inverse-multicond-better/runs/20260701_052831` | 9/10/2/4 |
| `PINN-inverse-multicond-excite/runs/20260702_153336` | 16/9/6/6 |
| `PINN-inverse-pinn-boost/runs/20260702_160102_integral` | 17/16/10/7 |
| `PINN-inverse-multicond/runs/20260630_032142_odefit` | 18/17/13/13 |
| `PINN-inverse-multicond-excite/runs/20260701_203130_odefit_excite` | 24/23/21/14 |

Two-parameter W/thetaP percentage errors: 1.1535/0.6285, 0.3911/1.1203, 2.8681/23.5266, 5.1247/141.9717. `deltaP1` is fixed in that experiment; its later structural confounding cannot by itself explain this earlier failure.

`PINN-inverse-pinn-boost/training.py` uses a trapezoidal integral residual, reference-derived relative weights with a 0.05 floor, and a fixed grid. The July 2 run used two starts; current defaults may differ. Selection by physics loss yields 50 recovered instances; selecting retrospectively by truth would yield 55, which is not an available real-data selection rule.

The 37→50 comparison changes the residual, weights, grid, and restart scheme; the base pulse endpoint also changes 80→88. The intended isolated ablation did not complete, including SIREN. The 61→82 classical comparison changes condition count, residual scaling, starts (one→four), and maximum objective evaluations (40→80). ODE fitting uses LSODA; PINN references use Radau. These are archived pipeline comparisons, not controlled estimates of one component's effect.

Recorded frozen-network diagnostics (including W drifting to 0.504 despite small state errors) are documented in `research-paper/paper.tex` and June/July working notes; the original transient scratch artifacts were not independently reconstructed for this article.

## Sensitivity and identifiability

- Model: `PINN-inverse-pinn-boost/config.py` and `odes.py`. Runtime rho5/rhoB/rho13 are 1.10/1.10/1.30. The ODE reference clips state inputs nonnegative; the displayed mathematical system is for nonnegative states.
- Corrected SA: `PINN/run_sa_7ode.py`; `PINN/sa_results/clipped_thetap/sa_config.json`, `morris_all.csv`, `sobol_all.csv`, `local_elasticity.csv`; compare `original_box/`. Corrected thetaP upper bound is 1.0. Original bound 1.3 crosses the positive-decay boundary. Clipping also changes the distribution and relative sampled range.
- FIM: `PINN-fisher-matrix/fisher_matrix.py`, `runs/20260711_203325_fisher/*_fim_summary.json`. Central-difference log-scaled sensitivities, LSODA, 14,000 rows. All regimes have one hard-null direction under the threshold. Near-correlation counts: 0/1/6/10. The correlation matrix uses a floored inverse.
- Reduced FIM: `PINN-fisher-matrix-top8/`. The other 28 parameters are fixed at truth. The condition numbers 99.7/120.9/229.4/665.2 characterize this conditional problem.
- Profiles: `PINN-inverse-multicond-excite/runs/20260705_020111_profile_ident/Cancer-like_profile_ci.csv`. Only Advanced Adenoma completed; stored labels 20 IDENT, 16 WEAK. Several finite intervals nearly coincide with or slightly exclude the recorded optimum. The finite numerical scans do not override the exact deltaP1/thetaP product ambiguity.

## Bayesian experiments

- First inverse HMC: `PINN-bayesian/runs/20260707_191047_bayes/`. Median ESS 3.4/5.6/3.1/5.4, coverage 1/0/1/1 of 36 despite all-IDENT width labels.
- Corrected inverse HMC: `PINN-bayesian/runs/20260713_204442_bayes/bayes_summary.md`, per-regime posterior summaries, and `bayesian_infer.py`. Median ESS 96/1265/12/15; coverage 21/20/8/9 of 36. All gates fail. The n_eff=2800 normalization is a chosen forty-sample-per-state effective budget; the inverse networks were trained with 150 times per condition. Residual scale and the initial Hessian are evaluated at the deterministic PINN estimate, not a separately optimized posterior mode. Posterior mean recovery 19/20/11/8 is not an identifiability count. Coverage is not strictly monotone across regimes.
- Forward HMC: `PINN-forward-bayesian/runs/20260711_203325_fwdbayes/`, `bayesian_forward.py`. Noisy-point coverage uses the same observations as the likelihood. The aggregate summary's phrase “held-out” is incorrect. Predictive coverage 0.95/0.94/0.94/0.95; predictive-functional ESS 400/104/195/97; potential-energy ESS only 3–4.

## Initial full hybrid runs

Code: `PINN-hybrid-ude/hybrid.py`, `training.py`, `aggregate_hybrid.py`. Constructing learned networks after state networks preserves state initialization. Learned-term penalty is mean squared non-bias weights, coefficient 1e-8. Frozen-state Stage 3 has effectively no effect in these runs.

| Run under `PINN-hybrid-ude/runs/` | Hybrid counts | Matched control counts | Denominator |
| --- | --- | --- | --- |
| `20260726_195830_control` | 18/15/12/8 | — | 36 |
| `20260726_214316_ra_h5` | 19/17/11/6 | 18/15/11/7 | 34 |
| `20260726_233410_ra_h5_nc` | 18/18/10/7 | 18/15/11/7 | 34 |
| `20260727_012448_bm_myc` | 13/13/9/8 | 16/13/12/7 | 34 |
| `20260727_031545_bm_myc_nc` | 13/14/9/6 | 16/13/12/7 | 34 |
| `20260728_233450_apc_mutation_frozen` | 17/15/12/9 | 18/14/12/8 | 35 |

APC calibration: `20260728_232743_apc_calibration/apc_calibration.json`. Train thetaP 1/.75/.5/.25, validate .875/.625/.375; fixed W=.8; three protocols; five starts. Held-out function NRMSE .1204%, full curve .1195%. The generating excess law is linear. Frozen Severe thetaP error remains 126.886%.

## Local screens, depletion, and prospective design

The local screen procedure is in `screen_terms.py`. Exact reference states and host-equation-only fitting differ from the full inverse problem.

- The five-construction Normal MYC table is recorded in `notes/2026-08-01-hybrid-edge-atlas-and-anchor-visiting.md`: function errors 3.0/5.1/2.9/4.8/35.1%, basal errors 14.1/24.0/13.8/22.8/202.8%. Its preliminary scratch run path was not reconstructed. It is a separate single-start population from the later atlas.
- `20260801_204046_screen_atlas/` completed 22 Normal cells then failed at an unsupported pairing. `20260802_screen_atlas_rest/` completed 69 supported cells across the other three regimes. No Normal three-input APC production fit exists in this atlas.
- Harder-regime modulator failures: Advanced/Severe MYC-HOXA5 function 44.7/46.6%; APC-beta-catenin 52.8/65.7%. The easy Normal result does not generalize. The registry name `h5_b` learns a function of beta-catenin multiplied by HOXA5, not a function of HOXA5 alone.
- `20260801_depletion_ab/`: separate one-start local A/B screens, RA-HOXA5 pooled host-equation recovery 3/8→8/8; RA-CYP26A1 6/8→8/8. Beta-catenin-CYP26A1 basal errors worsen.
- `20260801_infoctl/`: twelve conditions, matching the depletion arm's count but not a formal information matrix. Seven recovery-count ties, one regression, no gains versus ten-condition baseline.
- `20260802_dose_response/`: three arms, six doses, two regimes, two starts; eleven conditions each. Original stored score: P1/P2/P3/P5 fail, P4/P6 pass (2/6).
- `20260802_dose_starts5/`: Severe-only rerun, eighteen cells, five starts. Score 4/6, with RA monotonicity and absolute-threshold tests still failing. RA dose .1 basal error 23.4→3.4%; full dose 3.3%, versus 3.4% mechanistic control. WNT-only MYC full-dose error 2.6%; combined knockdown rounds to 0.0%.
- Prediction notes use inconsistent primary-versus-excess error wording. The shared-curve criterion has additional numeric implementation choices. These are local recorded exploratory predictions, not formal externally preregistered criteria.
- `20260802_protocol_test/`: MYC-HOXA13 prescribed depletion gives basal errors .1% / rounded .0%, but function errors worsen to 68.4/81.4% on changed input support. Severe host-equation recovery stays 2/4. HOXA13-beta-catenin anchor-reaching intervention removes W from that condition and does not fix W recovery.
- `anchor_reach.py` now checks that the target basal contribution remains active. Its protocol prescriptions do not mean all listed full hybrids were trained or laboratory interventions validated.

## Completed twelve-condition full PINNs

These completed after the working notes described them as running. Direct recovered JSONs supersede malformed late `hypothesis_test.txt` aggregate entries.

| Run | Recovery / 34 | Matched control / 34 | Functional NRMSE by regime |
| --- | --- | --- | --- |
| `20260802_010526_bm_myc_dep` | 15/16/13/13 | 17/16/13/13 | 2.34/2.40/2.89/2.70% |
| `20260802_041545_ra_h5_dep` | 18/20/18/18 | 18/17/14/14 | 11.57/9.63/9.54/9.56% |

Control: `20260801_211530_control_dep`. MYC basal errors 10.31/11.71/17.37/16.45%, versus control .395/.217/.433/.507%. RA-HOXA5 basal errors 13.00/4.73/2.44/3.80%, versus control 1.66/14.02/19.48/17.90%. RA function quality does not improve uniformly; the domain changes under depletion.

## Figure provenance

Website assets preserve the source plots' values and labels. The illustration and interactive example are not fitted-run results.

| Website filename | Research source |
| --- | --- |
| `early-forward-hybrid.png` | `research-paper/forward_pinn_hybrid.png` |
| `early-inverse-recovery-best8.png` | `research-paper/inv_recovery_bars_best8.png` |
| `fim-current-spectra.png` | `research-paper/fim_cross_regime_spectra.png` |
| `profile-advanced.png` | `research-paper/profile_likelihood_advanced_p1.png` |
| `inverse-posterior-corrected.png` | `PINN-bayesian/runs/20260713_204442_bayes/bayes_W_thetaP.png` |
| `forward-predictive-bands.png` | `research-paper/fwd_beta_bands.png` |
| `hybrid-apc-calibration.png` | APC calibration run named above |
| `hybrid-anchor-dose-response.png` | Original two-start dose-response run named above |
| `hybrid-myc-depletion-full-pinn.png` | Completed twelve-condition MYC run named above |

The original dose plot's overarching title is broader than the supported result and is cropped in the article asset. All four panels, data points, axes, legends and panel titles are preserved; the original remains in the research repository. The article caption explicitly limits its interpretation and retains the failed RA cases. The article reports model-specific evidence, not a general identifiability theorem or a claim of clinical validation.
